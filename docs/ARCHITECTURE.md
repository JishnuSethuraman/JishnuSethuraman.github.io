# Architecture

A comic-book portfolio built with **Next.js 16 (App Router)**, statically exported and served
from **GitHub Pages**. There is no server runtime — `next build` with `output: "export"` emits a
fully static site into `out/`.

```
┌─────────────────────────────────────────────────────────────────────┐
│  git push ──► CI (lint · format · types · build · e2e)              │
│                                                                     │
│  main ──► pages.yml (gates + build) ──► GitHub Pages (static out/)  │
└─────────────────────────────────────────────────────────────────────┘
```

## Runtime model

The page is a single route (`src/app/page.tsx`) composed of section components inside one
client-side shell:

| Layer      | File                                                                 | Responsibility                                                                                                 |
| ---------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Shell      | `src/components/comic/ComicRoot.tsx`                                 | Theme state, theme-transition overlay, cinematic overlays (cursor, spine nav, intro curtain), hosts the engine |
| Engine     | `src/components/comic/useComicEngine.ts`                             | Single rAF loop driving every scroll/pointer effect via `data-*` hooks                                         |
| Sections   | `Hero` · `Career` · `Projects` · `About` · `Contact` · `WorkDivider` | Static JSX with `data-role` / `data-px` / `data-tilt` / `data-dolly` attributes                                |
| Primitives | `Reveal.tsx` · `useDisclosure.ts` · `ui.ts`                          | IntersectionObserver reveals, WAAPI expand/collapse, shared constants                                          |
| Styling    | `src/app/globals.css`                                                | Theme CSS variables, all keyframes, hover states, mobile-relief media queries                                  |

### The engine contract

React renders each section **once**; it never re-renders on scroll. All motion comes from
`useComicEngine`, which queries `data-*` hooks at mount and mutates only `transform`,
`opacity`, and `filter` inside one `requestAnimationFrame` loop:

- `data-role="heroPin"` / `tunnel` / `tunRing` / `tunStar` / `warpHud` — scroll-scrubbed warp
  tunnel inside the 380vh pinned hero
- `data-role="projPin"` / `shelf` / `fileHud` — scroll-scrubbed horizontal project shelf
  (300vh pin)
- `data-px="<factor>"` — mouse + scroll parallax depth layers
- `data-dolly` — sections dolly-in as they enter the viewport
- `data-tilt` — pointer-tracked portrait tilt
- `data-spine` — active-chapter highlighting in the fixed spine nav

This split (React owns the DOM shape, the engine owns per-frame style writes) is what keeps
the page at one render pass and makes the effects safe to disable wholesale.

### Theming

Two themes ("light" cover / "inky night") are CSS-variable driven. `ComicRoot` owns a
`data-theme` attribute; `[data-theme="dark"] .scene-light { display:none }` style rules flip
the hero scenes, and every section reads `var(--bg/--ink/--panel/...)`. The 1s page-turn
transition is Web Animations API on fixed overlay elements that are **permanently
composited** (`will-change`, no display toggles; the speed-line burst is rastered at 71vmax
and scaled ~3× when animated). The actual `data-theme` swap happens at 420ms — behind the
flash overlay's full-cover window (0.30–0.62) — and the engine pauses its layout-reading
loop (`data-transitioning`) so the page-wide restyle can't stall the visible animation.

### Performance modes

| Mode                    | Trigger                                             | Behavior                                                                                               |
| ----------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Cinematic** (desktop) | fine pointer, viewport > 820px, no reduced-motion   | Pinned warp hero + shelf, engine loop, custom cursor, intro curtain, comic SFX                         |
| **Lite** (mobile)       | coarse pointer **or** ≤ 820px **or** reduced-motion | Everything unpinned and static; engine loop never starts; `.ray-layer` conic gradients removed via CSS |

Lite mode exists because the pinned sections scale-and-blur a full-screen subtree per frame
and the ~2000px `vmax` conic-gradient layers exhaust mobile GPU memory (Safari kills and
reload-loops the tab). The mobile Playwright project is the permanent regression suite for
this.

### Assets

Plain `<img>` with pre-sized files in `public/` — `next/image` optimization is unavailable
under static export (`images.unoptimized`). Fonts are self-hosted at build time via
`next/font` (Permanent Marker, Space Grotesk, Space Mono).

## Delivery pipeline

1. **Local, per commit** — Husky `pre-commit` runs lint-staged (ESLint `--fix` + Prettier on
   staged files); `commit-msg` enforces Conventional Commits; `pre-push` runs typecheck + lint.
2. **CI, every push** (`.github/workflows/ci.yml`) — two parallel jobs:
   - _quality_: ESLint · Prettier check · `tsc --noEmit`
   - _e2e_: production build + Playwright against the static `out/` on **desktop Chromium**
     and **mobile WebKit** (iPhone emulation)
3. **Deploy, main only** (`.github/workflows/pages.yml`) — lint + typecheck gate the build,
   then the `out/` artifact deploys to GitHub Pages.

## Testing architecture

E2E tests serve `out/` with a static file server — byte-for-byte what GitHub Pages serves.
The two Playwright projects map 1:1 to the two performance modes, so every feature is
verified in the mode users actually get on that device class. See
[ENGINEERING.md](./ENGINEERING.md) for the gate matrix and roadmap.
