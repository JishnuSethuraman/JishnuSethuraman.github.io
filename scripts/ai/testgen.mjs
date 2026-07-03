#!/usr/bin/env node
/**
 * Local-LLM test assistant.
 *
 * Runs a Hugging Face coder model locally through Ollama (GGUF, 4-bit — sized
 * for an 8GB-VRAM GPU) and uses it to draft Playwright specs and review
 * outgoing diffs for missing test coverage.
 *
 *   node scripts/ai/testgen.mjs setup                  install ollama (winget), pull the HF model
 *   node scripts/ai/testgen.mjs generate <files...>    draft a Playwright spec for source file(s)
 *   node scripts/ai/testgen.mjs check --staged         deterministic coverage check (pre-commit)
 *   node scripts/ai/testgen.mjs review [--push]        LLM reviews the diff, suggests test cases (pre-push)
 *
 * Env:
 *   AI_MODEL    override the model (default: hf.co/bartowski/Qwen2.5-Coder-7B-Instruct-GGUF:Q4_K_M
 *               — the single-file community quant; Qwen's official GGUF repo is sharded,
 *               which ollama cannot pull from HF yet, see ollama/ollama#5245)
 *               low-VRAM fallback: hf.co/bartowski/Qwen2.5-Coder-3B-Instruct-GGUF:Q4_K_M
 *   OLLAMA_HOST override the server (default: http://127.0.0.1:11434)
 *   SKIP_AI=1   skip all LLM steps (hooks become no-ops)
 *   AI_STRICT=1 make the advisory checks blocking (non-zero exit)
 *
 * Design rule: only deterministic checks may block a commit/push. LLM output
 * is advisory or lands as reviewable draft files — never auto-committed.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const MODEL = process.env.AI_MODEL || "hf.co/bartowski/Qwen2.5-Coder-7B-Instruct-GGUF:Q4_K_M";
const HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
const STRICT = process.env.AI_STRICT === "1";
const SKIP = process.env.SKIP_AI === "1" || process.env.CI;
const ROOT = process.cwd();

const log = (msg) => console.log(`[ai-testgen] ${msg}`);

// ---------------------------------------------------------------- utilities

function git(...args) {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function run(cmd, args, opts = {}) {
  // Windows needs a shell to resolve .cmd shims (npx, winget); build one quoted
  // string so args aren't naively concatenated (DEP0190).
  if (process.platform === "win32") {
    const line = [cmd, ...args].map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(" ");
    return spawnSync(line, { encoding: "utf8", shell: true, ...opts });
  }
  return spawnSync(cmd, args, { encoding: "utf8", ...opts });
}

/** Find the ollama binary even when a fresh install isn't on this process's PATH yet. */
function resolveOllama() {
  const candidates = [
    "ollama",
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Programs", "Ollama", "ollama.exe"),
    "C:\\Program Files\\Ollama\\ollama.exe",
  ].filter(Boolean);
  for (const bin of candidates) {
    try {
      const res = spawnSync(bin, ["--version"], { encoding: "utf8" });
      if (res.status === 0) return bin;
    } catch {
      /* try next */
    }
  }
  return null;
}

function readIfExists(path, cap = 9000) {
  if (!existsSync(path)) return "";
  const text = readFileSync(path, "utf8");
  return text.length > cap ? `${text.slice(0, cap)}\n/* …truncated… */` : text;
}

async function serverUp() {
  try {
    const res = await fetch(`${HOST}/api/version`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

async function chat(messages, { maxTokens = 1600, temperature = 0.2 } = {}) {
  const res = await fetch(`${HOST}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    signal: AbortSignal.timeout(600_000),
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: false,
      options: { temperature, num_ctx: 8192, num_predict: maxTokens },
    }),
  });
  if (!res.ok) throw new Error(`ollama ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.message?.content ?? "";
}

function extractCode(reply) {
  const fence = reply.match(/```(?:ts|tsx|typescript)?\s*\n([\s\S]*?)```/);
  return (fence ? fence[1] : reply).trim();
}

// ------------------------------------------------------------------- setup

/** Pull a model through the server API (no PATH dependency), streaming progress. */
async function apiPull(model) {
  const res = await fetch(`${HOST}/api/pull`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, stream: true }),
  });
  if (!res.ok || !res.body) throw new Error(`pull failed: ${res.status} ${await res.text()}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let lastPct = -10;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.trim()) continue;
      const evt = JSON.parse(line);
      if (evt.error) throw new Error(evt.error);
      if (evt.total && evt.completed != null) {
        const pct = Math.floor((evt.completed / evt.total) * 100);
        if (pct >= lastPct + 10) {
          lastPct = pct;
          log(`  downloading… ${pct}% of ${(evt.total / 1e9).toFixed(1)}GB`);
        }
      } else if (evt.status && !evt.status.startsWith("pulling")) {
        log(`  ${evt.status}`);
      }
    }
  }
}

async function setup() {
  let bin = resolveOllama();
  if (!bin && !(await serverUp())) {
    log("ollama not found — installing via winget (this may take a few minutes)…");
    const install = run(
      "winget",
      [
        "install",
        "-e",
        "--id",
        "Ollama.Ollama",
        "--accept-source-agreements",
        "--accept-package-agreements",
      ],
      { stdio: "inherit" },
    );
    if (install.status !== 0) {
      log("winget install failed. Install manually from https://ollama.com/download and re-run.");
      process.exit(1);
    }
    bin = resolveOllama();
  }

  if (!(await serverUp())) {
    if (!bin) {
      log("ollama binary not found even after install — open a new terminal and re-run.");
      process.exit(1);
    }
    log("starting ollama server…");
    const { spawn } = await import("node:child_process");
    spawn(bin, ["serve"], { detached: true, stdio: "ignore" }).unref();
    for (let i = 0; i < 20 && !(await serverUp()); i++) {
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (!(await serverUp())) {
      log("server did not come up — launch the Ollama app once, then re-run.");
      process.exit(1);
    }
  }

  log(`pulling ${MODEL} from Hugging Face (~4.7GB for the 7B Q4_K_M)…`);
  await apiPull(MODEL);

  log("smoke-testing the model (first load takes ~30s)…");
  const reply = await chat([{ role: "user", content: "Reply with exactly: OK" }], {
    maxTokens: 10,
  });
  log(`model replied: ${reply.trim().slice(0, 40)}`);
  log("setup complete. Try: npm run ai:testgen -- src/components/comic/TopBar.tsx");
}

// ---------------------------------------------------------------- generate

const CONVENTIONS = `
Conventions for this repo's Playwright specs (follow them exactly):
- import { test, expect } from "@playwright/test"; helpers from "../utils" (trackErrors).
- baseURL is preconfigured: always navigate with page.goto("/").
- The site has two modes. Specs run on device projects by FILENAME:
  *.shared.spec.ts (both), *.desktop.spec.ts (desktop Chromium only), *.mobile.spec.ts (iPhone WebKit only).
- Desktop: hero is a pinned 380vh warp section ([data-role=heroPin]); projects are a pinned
  shelf ([data-role=projPin] / [data-role=shelf]). Mobile ("lite"): nothing is pinned,
  [data-role=tunnel] and .ray-layer are display:none.
- Theme: root carries data-theme="light|dark"; the top-bar button "GO DARK"/"GO LIGHT"
  toggles it with a ~1s transition — use generous expect timeouts after clicking.
- Sections: #chapter-1 (career timeline), #chapter-2 (projects), #chapter-3 (about),
  #finale (contact). Expanders are real <button>s with aria-expanded.
- Prefer role-based locators; use expect.poll for values the rAF engine writes.
- Never use page.waitForTimeout as the primary synchronization; assert on state.
- CRITICAL: the site uses inline styles — there are almost NO css classes. Locate elements
  ONLY by (a) visible text, (b) ARIA roles, or (c) data-role/id/class attributes that
  literally appear in the provided source code. Never invent selectors, classes, props,
  or data attributes that are not in the source.
Output ONLY one complete TypeScript spec file in a single \`\`\`ts code fence.
`;

async function generateSpec(files, flavor) {
  const sources = files.map((f) => `--- ${f} ---\n${readIfExists(join(ROOT, f))}`).join("\n\n");
  const styleRef = readIfExists(join(ROOT, "e2e/home.shared.spec.ts"), 5000);
  const utils = readIfExists(join(ROOT, "e2e/utils.ts"), 2000);

  const name = basename(files[0])
    .replace(/\.(tsx|ts|css)$/, "")
    .toLowerCase();
  const outDir = join(ROOT, "e2e", "generated");
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, `${name}.${flavor}.spec.ts`);

  const messages = [
    {
      role: "system",
      content: `You are a senior QA engineer writing Playwright e2e tests for a Next.js static-export portfolio site.\n${CONVENTIONS}`,
    },
    {
      role: "user",
      content: `Existing spec for style reference:\n\`\`\`ts\n${styleRef}\n\`\`\`\n\nShared helpers (import from "../utils"):\n\`\`\`ts\n${utils}\n\`\`\`\n\nWrite a new ${flavor} spec (filename ${name}.${flavor}.spec.ts) covering the user-visible behavior of:\n\n${sources}\n\nWrite 3-6 focused tests. Do not duplicate tests that already exist in the style reference.`,
    },
  ];

  log(
    `asking ${MODEL} for ${basename(outFile)} (first token can take ~30s while the model loads)…`,
  );
  let code = extractCode(await chat(messages, { maxTokens: 2000 }));

  // playwright's CLI treats file args as regex filters — always hand it a
  // relative, forward-slash path or nothing matches on Windows
  const relOut = `e2e/generated/${name}.${flavor}.spec.ts`;

  for (let attempt = 1; attempt <= 2; attempt++) {
    writeFileSync(outFile, `${code}\n`);
    run("npx", ["prettier", "--write", relOut]);
    run("npx", ["eslint", "--fix", relOut]);
    const list = run("npx", ["playwright", "test", relOut, "--list"]);
    if (list.status === 0) {
      log(`✔ wrote ${relOut} — review it, run it, then commit it:`);
      log(`    npx playwright test ${relOut}`);
      return;
    }
    if (attempt === 2) break;
    log("generated spec failed to parse — asking the model to repair it…");
    const error = `${list.stdout}\n${list.stderr}`.slice(0, 3000);
    code = extractCode(
      await chat(
        [
          ...messages,
          { role: "assistant", content: `\`\`\`ts\n${code}\n\`\`\`` },
          {
            role: "user",
            content: `That spec fails to load:\n\`\`\`\n${error}\n\`\`\`\nFix it. Output the full corrected file in one \`\`\`ts fence.`,
          },
        ],
        { maxTokens: 2000 },
      ),
    );
  }

  const draft = outFile.replace(/\.spec\.ts$/, ".draft.ts");
  writeFileSync(draft, `${code}\n`);
  log(
    `✖ could not produce a loadable spec; draft saved to ${draft.replace(ROOT, ".")} for manual repair.`,
  );
  process.exitCode = 1;
}

// ------------------------------------------------------------------- check

/** Deterministic: do changed source files have any e2e coverage? Never calls the LLM. */
const COVERAGE_ANCHORS = {
  Hero: ["heroPin", "tunnel", "warpPct"],
  Career: ["chapter-1", "EARLIER CHAPTERS"],
  Projects: ["chapter-2", "shelf", "OPEN FILE"],
  About: ["chapter-3", "CONTINUE READING"],
  Contact: ["finale", "RESUME"],
  TopBar: ["GO DARK"],
  ComicRoot: ["data-theme"],
  WorkDivider: ["THE WORK"],
  useComicEngine: ["heroPin", "ray-layer"],
  Reveal: ["scrollIntoViewIfNeeded"],
};

function coverageCheck(changed) {
  const specs = ["home.shared.spec.ts", "home.desktop.spec.ts", "home.mobile.spec.ts"]
    .map((f) => readIfExists(join(ROOT, "e2e", f), 50_000))
    .concat(
      existsSync(join(ROOT, "e2e/generated"))
        ? git("ls-files", "e2e/generated")
            .split("\n")
            .filter(Boolean)
            .map((f) => readIfExists(join(ROOT, f), 50_000))
        : [],
    )
    .join("\n");

  const sources = changed.filter(
    (f) => /^src\/(components|app)\//.test(f) && /\.(tsx|ts|css)$/.test(f),
  );
  if (sources.length === 0) return [];

  const uncovered = [];
  for (const file of sources) {
    const name = basename(file).replace(/\.(tsx|ts|css)$/, "");
    const anchors = COVERAGE_ANCHORS[name] ?? [name];
    if (!anchors.some((a) => specs.includes(a))) uncovered.push(file);
  }
  return uncovered;
}

function check(staged) {
  const changed = (
    staged ? git("diff", "--cached", "--name-only") : git("diff", "--name-only", "HEAD~1")
  )
    .split("\n")
    .filter(Boolean);
  const uncovered = coverageCheck(changed);
  if (uncovered.length === 0) return;
  log("heads-up — changed source files with no obvious e2e coverage:");
  for (const f of uncovered) log(`    ${f}`);
  log("draft a spec with:  npm run ai:testgen -- <file>   (or add coverage manually)");
  if (STRICT) process.exitCode = 1;
}

// ------------------------------------------------------------------ review

async function review(forPush) {
  if (SKIP) return;
  if (!(await serverUp())) {
    log("ollama not running — skipping AI review (npm run ai:setup to enable).");
    return;
  }

  let range = ["diff", "--cached"];
  if (forPush) {
    const upstream = git("rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}");
    range = ["diff", `${upstream || "origin/main"}...HEAD`, "--", "src", "e2e"];
  }
  const diff = git(...range).slice(0, 9000);
  if (!diff.trim()) return;

  log(`reviewing outgoing diff with ${MODEL}…`);
  try {
    const reply = await chat(
      [
        {
          role: "system",
          content:
            "You are a QA reviewer for a Playwright-tested portfolio site. Given a git diff, list the most important MISSING test cases (max 5) as short bullets: what to assert and which spec file to put it in (*.shared/*.desktop/*.mobile.spec.ts). If coverage looks sufficient, say exactly: Coverage looks sufficient. Be terse; no code.",
        },
        { role: "user", content: `\`\`\`diff\n${diff}\n\`\`\`` },
      ],
      { maxTokens: 400 },
    );
    console.log(
      `\n--- AI test review (advisory) ---\n${reply.trim()}\n---------------------------------\n`,
    );
  } catch (err) {
    log(`AI review skipped (${err.message.slice(0, 80)})`);
  }
}

// -------------------------------------------------------------------- main

const [mode, ...args] = process.argv.slice(2);
switch (mode) {
  case "setup":
    await setup();
    break;
  case "generate": {
    const flavorFlag = args.find((a) => a.startsWith("--flavor="));
    const flavor = flavorFlag ? flavorFlag.split("=")[1] : "shared";
    const files = args.filter((a) => !a.startsWith("--"));
    if (files.length === 0) {
      log("usage: generate <src file...> [--flavor=shared|desktop|mobile]");
      process.exit(1);
    }
    if (!(await serverUp())) {
      log("ollama not running — run: npm run ai:setup");
      process.exit(1);
    }
    await generateSpec(files, flavor);
    break;
  }
  case "check":
    check(args.includes("--staged"));
    break;
  case "review":
    await review(args.includes("--push"));
    break;
  default:
    log("modes: setup | generate <files...> | check --staged | review [--push]");
    process.exit(mode ? 1 : 0);
}
