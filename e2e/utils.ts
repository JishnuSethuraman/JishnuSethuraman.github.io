import type { Page } from "@playwright/test";

/**
 * Collects runtime errors (uncaught exceptions + console.error) for a page.
 * Attach before `page.goto()` and assert the array is empty at the end.
 */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  return errors;
}
