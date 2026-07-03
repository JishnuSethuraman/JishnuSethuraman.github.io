import { test, expect } from "@playwright/test";

// LLM-drafted (Qwen2.5-Coder-7B local), human-vetted: the mailto button is not
// an external link (no target), so the new-tab contract covers only the three
// external buttons.
test.describe("contact finale", () => {
  test("exactly four action buttons with the right labels", async ({ page }) => {
    await page.goto("/");
    const finale = page.locator("#finale");
    await finale.scrollIntoViewIfNeeded();

    const buttons = finale.locator(".contact-btn");
    await expect(buttons).toHaveCount(4);
    await expect(buttons.nth(0)).toHaveText("RESUME");
    await expect(buttons.nth(1)).toHaveText("LINKEDIN");
    await expect(buttons.nth(2)).toHaveText("GITHUB");
    await expect(buttons.nth(3)).toHaveText("EMAIL ▾");
  });

  test("external links open in a new tab; email stays a mailto", async ({ page }) => {
    await page.goto("/");
    const finale = page.locator("#finale");
    const buttons = finale.locator(".contact-btn");
    for (const i of [0, 1, 2]) {
      await expect(buttons.nth(i)).toHaveAttribute("target", "_blank");
      await expect(buttons.nth(i)).toHaveAttribute("rel", "noopener");
    }
    await expect(buttons.nth(3)).toHaveAttribute("href", /^mailto:/);
    await expect(buttons.nth(3)).not.toHaveAttribute("target", "_blank");
  });

  test("finale closes the issue with the comic outro", async ({ page }) => {
    await page.goto("/");
    const finale = page.locator("#finale");
    await finale.scrollIntoViewIfNeeded();
    await expect(finale.getByText("TO BE CONTINUED…")).toBeVisible();
    await expect(finale.getByRole("link", { name: /READ IT AGAIN/ })).toHaveAttribute(
      "href",
      "#top",
    );
  });
});
