import { test, expect } from "@playwright/test";

// LLM-drafted (Qwen2.5-Coder-7B local), human-vetted: node content is asserted
// against the real timeline copy and the progress rail uses its data-role hook.
test.describe("career timeline", () => {
  test("latest nodes show the right roles and dates", async ({ page }) => {
    await page.goto("/");
    await page.locator("#chapter-1").scrollIntoViewIfNeeded();

    const section = page.locator("#chapter-1");
    await expect(section.getByRole("heading", { name: "Deloitte" })).toBeVisible();
    await expect(section.getByText("Associate GenAI Engineer")).toBeVisible();
    await expect(section.getByText("2026 — PRESENT")).toBeVisible();

    await expect(section.getByRole("heading", { name: "RTX · Collins Aerospace" })).toBeVisible();
    await expect(section.getByText("ML/AI Intern")).toBeVisible();
    await expect(section.getByText("MAY 2025 — AUG 2025")).toBeVisible();
  });

  test("progress rail fills as the timeline scrolls past", async ({ page }) => {
    await page.goto("/");
    const rail = page.locator("[data-role=tlprogress]");

    await page.locator("#chapter-1").scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      const el = document.querySelector("#chapter-1");
      if (el) window.scrollTo(0, window.scrollY + el.getBoundingClientRect().bottom);
    });

    await expect
      .poll(() => rail.evaluate((el) => parseFloat((el as HTMLElement).style.height) || 0), {
        timeout: 5000,
      })
      .toBeGreaterThan(10);
  });
});
