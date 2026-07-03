import { test, expect } from "@playwright/test";

// LLM-drafted (Qwen2.5-Coder-7B local), human-vetted: the scrub test drives the
// pinned section the way a reader scrolls and asserts the engine's outputs
// (shelf position + FILE HUD) instead of invented class names.
test.describe("projects — desktop pinned shelf", () => {
  test("all eight case files are on the shelf", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-role=shelf] > div")).toHaveCount(8);
  });

  test("open file toggles aria-expanded both ways", async ({ page }) => {
    await page.goto("/");
    await page.locator("#chapter-2").scrollIntoViewIfNeeded();
    const firstCard = page.locator("[data-role=shelf] > div").first();
    const btn = firstCard.getByRole("button", { name: /OPEN FILE|CLOSE FILE/ });

    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  test("scrolling the pin scrubs the shelf and advances the file HUD", async ({ page }) => {
    await page.goto("/");
    const shelf = page.locator("[data-role=shelf]");
    const hud = page.locator("[data-role=fileHud]");

    await page.evaluate(() => {
      const pin = document.querySelector("[data-role=projPin]") as HTMLElement;
      const total = pin.getBoundingClientRect().height - window.innerHeight;
      window.scrollTo(0, Math.round(pin.offsetTop + total * 0.6));
    });

    await expect
      .poll(() => shelf.evaluate((el) => el.scrollLeft), { timeout: 5000 })
      .toBeGreaterThan(100);
    await expect.poll(() => hud.textContent(), { timeout: 5000 }).not.toBe("FILE 01 / 08");
  });
});
