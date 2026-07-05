import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests run against the production static export (`out/`), served exactly
 * the way GitHub Pages serves it. Run `npm run build` first (CI does), or use
 * `npm run verify` for the full local gate.
 *
 * Two projects mirror the site's two performance modes:
 *  - desktop-chromium: full cinematic mode (pinned warp hero, engine loop)
 *  - mobile-webkit:    "lite" mode on iPhone emulation (the Safari-crash regression suite)
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npx serve out -l 4173 --no-clipboard",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      testMatch: /.*\.(shared|desktop)\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-webkit",
      testMatch: /.*\.(shared|mobile)\.spec\.ts/,
      use: { ...devices["iPhone 13"] },
    },
  ],
});
