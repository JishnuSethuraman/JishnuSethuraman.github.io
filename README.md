# jishnusethuraman.github.io

[![CI](https://github.com/JishnuSethuraman/JishnuSethuraman.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/JishnuSethuraman/JishnuSethuraman.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/JishnuSethuraman/JishnuSethuraman.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/JishnuSethuraman/JishnuSethuraman.github.io/actions/workflows/pages.yml)

Comic-book portfolio for **Jayadityan (Jay) Sethuraman** — a scroll-driven "issue #01" with a
warp-tunnel hero, pinned project shelf, and light/dark ("inky night") editions.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · static export → GitHub Pages.

## Getting started

```bash
nvm use          # Node 24
npm ci
npm run dev      # http://localhost:3000
```

## Scripts

| Script                            | What it does                                                     |
| --------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                     | Dev server                                                       |
| `npm run build`                   | Production static export → `out/`                                |
| `npm run lint` / `lint:fix`       | ESLint (Next 16 flat config)                                     |
| `npm run typecheck`               | `tsc --noEmit`                                                   |
| `npm run format` / `format:check` | Prettier write / verify                                          |
| `npm run test:e2e`                | Playwright e2e against `out/` (build first)                      |
| `npm run test:e2e:ui`             | Playwright UI mode                                               |
| `npm run verify`                  | The full CI gate locally: lint · format · types · build · e2e    |
| `npm run ai:setup`                | Install Ollama + pull the local HF coder model (7B Q4, 8GB VRAM) |
| `npm run ai:testgen -- <file>`    | Draft a Playwright spec for a component with the local LLM       |

## Quality system

- **Husky** — pre-commit (lint-staged), commit-msg (Conventional Commits), pre-push
  (typecheck + lint)
- **CI on every push** — lint/format/types job + build/e2e job (desktop Chromium and mobile
  WebKit, testing the exact static export GitHub Pages serves)
- **Gated deploys** — `main` deploys to Pages only after lint + typecheck + build pass

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — runtime model, the animation engine's
  `data-*` contract, theming, and the desktop-cinematic vs. mobile-lite performance modes
- [docs/ENGINEERING.md](docs/ENGINEERING.md) — quality-gate matrix, conventions, and the
  phased roadmap (visual regression, a11y, Lighthouse budgets, preview deploys, …)
