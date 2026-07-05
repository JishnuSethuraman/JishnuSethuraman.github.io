# Engineering plan

The quality system for this repo: what runs where today, the conventions, and the roadmap.

## Quality gates

| Gate           | When            | What runs                                                                     | Enforced by                     |
| -------------- | --------------- | ----------------------------------------------------------------------------- | ------------------------------- |
| Format + lint  | `git commit`    | lint-staged → ESLint `--fix` + Prettier on staged files                       | Husky `pre-commit`              |
| Commit message | `git commit`    | Conventional Commits (`type(scope): subject`, ≤ 100 chars)                    | Husky `commit-msg`              |
| Types + lint   | `git push`      | `tsc --noEmit` + `eslint .`                                                   | Husky `pre-push`                |
| Full static    | every push (CI) | ESLint · `prettier --check` · `tsc --noEmit`                                  | `ci.yml` _quality_ job          |
| E2E            | every push (CI) | build → Playwright (desktop Chromium + mobile WebKit)                         | `ci.yml` _e2e_ job              |
| Deploy gate    | push to `main`  | lint + typecheck + build, then Pages deploy                                   | `pages.yml`                     |
| Dependencies   | weekly          | npm (grouped minor/patch) + GitHub Actions updates                            | Dependabot                      |
| Test coverage  | `git commit`    | deterministic check: changed source ↔ e2e anchors (advisory)                  | Husky `pre-commit` → `ai:check` |
| AI test review | `git push`      | local LLM reviews outgoing diff, suggests missing tests (advisory, fail-open) | Husky `pre-push` → `ai:review`  |

One command reproduces the whole CI gate locally:

```bash
npm run verify   # lint · format:check · typecheck · build · e2e
```

## Local workflow

```bash
nvm use               # Node 24 (see .nvmrc; its npm 11 owns the lockfile format)
npm ci
npx playwright install chromium webkit   # once, for e2e

npm run dev           # dev server
npm run test:e2e      # e2e against out/ (run `npm run build` first)
npm run test:e2e:ui   # Playwright UI mode for debugging
```

Husky installs its hooks automatically via the `prepare` script on `npm ci`.

## Local AI test assistant

`scripts/ai/testgen.mjs` runs a Hugging Face coder model **locally** through Ollama —
no code ever leaves the machine. Sized for an 8GB-VRAM GPU (RTX 3070):
**Qwen2.5-Coder-7B-Instruct**, GGUF **Q4_K_M** (~4.7GB), pulled straight from Hugging Face
(`hf.co/bartowski/Qwen2.5-Coder-7B-Instruct-GGUF:Q4_K_M` — the single-file community
quant; Qwen's official GGUF repo is sharded, which Ollama can't pull yet).

```bash
npm run ai:setup                                     # install ollama (winget) + pull the model
npm run ai:testgen -- src/components/comic/Foo.tsx   # draft e2e/generated/foo.shared.spec.ts
npm run ai:testgen -- src/... --flavor=mobile        # target the mobile project instead
npm run ai:check                                     # what pre-commit runs (deterministic)
npm run ai:review                                    # what pre-push runs (LLM, advisory)
```

How it plugs into the hooks — the design rule is **deterministic checks may block; LLM
output never does**:

- `pre-commit` → `ai:check` — a static map of changed source files to e2e anchor strings;
  warns when a change has no obvious coverage. No LLM, instant, advisory
  (`AI_STRICT=1` makes it blocking).
- `pre-push` → `ai:review` — the local model reads the outgoing diff and prints up to five
  missing test cases with target spec files. Fails open when Ollama isn't running; skipped
  in CI and with `SKIP_AI=1`.
- `ai:testgen` — generates a full spec using the repo's conventions and existing specs as
  style reference, then formats (Prettier), lints (ESLint `--fix`), and validates it loads
  (`playwright test --list`), with one automatic repair round. Output lands in
  `e2e/generated/` **for human review** — run it, prune weak assertions, then commit it.
  Unparseable output is saved as an ignored `.draft.ts` instead.

Knobs: `AI_MODEL` (e.g. the 3B fallback `hf.co/bartowski/Qwen2.5-Coder-3B-Instruct-GGUF:Q4_K_M`
when VRAM is busy), `OLLAMA_HOST`, `SKIP_AI=1`, `AI_STRICT=1`.

## Conventions

- **Commits** — [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`,
  `docs:`, `style:`, `refactor:`, `test:`, `build:`, `ci:`, `chore:`. Enforced by commitlint.
- **Branches** — short-lived feature branches, PR into `main`. `main` is always deployable
  (the deploy workflow re-gates it regardless).
- **Formatting** — Prettier is the single source of truth; never hand-format against it.
- **Testing** — every user-visible feature lands with e2e coverage in **both** Playwright
  projects, or an explicit reason it is device-specific. Regressions get a test first.

## Roadmap

### Phase 1 — Foundations ✅ (this PR)

- ESLint (Next 16 flat config) + Prettier + TypeScript strict checks
- Husky + lint-staged + commitlint
- Playwright e2e: desktop cinematic + mobile lite projects, 20 tests
- CI on every push; hardened Pages deploy; Dependabot; PR template
- Architecture + engineering docs

### Phase 2 — Deeper verification

- **Unit tests (Vitest)** for engine math: `clamp01`/`ez` easing windows, warp progress
  mapping, shelf scrub interpolation — the pure logic inside `useComicEngine`
- **Visual regression** — Playwright `toHaveScreenshot()` for hero light/dark and each
  section, per device project, with a review workflow for intentional changes
- **Accessibility audits** — `@axe-core/playwright` scan per section + keyboard-nav tests;
  fix findings (focus order through the pinned sections is the known hard part)
- **Performance budgets** — Lighthouse CI on the built `out/` with budgets (LCP, CLS, total
  JS ≤ current baseline); fail CI on regression

### Phase 3 — Delivery maturity

- **PR preview deploys** — build `out/` per PR and publish to a preview channel (e.g.
  Cloudflare Pages or Netlify preview) so design changes are reviewable from a URL
- **Release hygiene** — auto-generated changelog from Conventional Commits; tagged releases
- **Runtime monitoring** — lightweight RUM (web-vitals → analytics endpoint) and error
  reporting; alert on mobile crash-loop signatures specifically
- **Branch protection** — require CI green + linear history on `main` once collaboration starts

### Phase 4 — Content architecture

- Externalize career/projects data from JSX into typed content modules (`content/*.ts` with
  zod schemas) so copy edits don't touch components
- Structured metadata (OpenGraph images per section, JSON-LD Person schema)
- Optional: MDX case-study pages per project, reusing the comic primitives

## Definition of done

A change is done when: CI is green on both jobs, it renders correctly in light + dark themes,
it behaves in both performance modes (desktop cinematic, mobile lite), and any new behavior
has an e2e assertion that would catch its regression.
