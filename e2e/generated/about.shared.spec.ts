import { test, expect } from "@playwright/test";

// LLM-drafted (Qwen2.5-Coder-7B local), human-vetted: real button labels
// ("CONTINUE READING"/"LESS"), real dossier copy, and the redact effect
// asserted by computed color instead of invented class names.
test.describe("about dossier", () => {
  test("dossier expands and collapses with aria state", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#chapter-3");
    await section.scrollIntoViewIfNeeded();

    const moreText = section.getByText(/Proven track record of optimizing model efficiency/);
    const btn = section.getByRole("button", { name: "CONTINUE READING" });
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await expect(moreText).toBeHidden();

    await btn.click();
    const less = section.getByRole("button", { name: /LESS/ });
    await expect(less).toHaveAttribute("aria-expanded", "true");
    await expect(moreText).toBeVisible();

    await less.click();
    await expect(section.getByRole("button", { name: "CONTINUE READING" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await expect(moreText).toBeHidden();
  });

  test("dossier is stamped and headed correctly", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#chapter-3");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("heading", { name: "THE ENGINEER" })).toBeVisible();
    await expect(section.getByText("DOSSIER", { exact: true })).toBeVisible();
    await expect(section.getByText("DECLASSIFIED", { exact: true })).toBeVisible();
  });

  test("redacted phrases un-redact when scrolled into view", async ({ page }) => {
    await page.goto("/");
    const redacted = page.getByText("high-performance LLM pipelines");
    await page.locator("#chapter-3").scrollIntoViewIfNeeded();

    // Reveal flips color from transparent to inherited ink via a CSS transition
    await expect
      .poll(() => redacted.evaluate((el) => getComputedStyle(el).color), { timeout: 7000 })
      .not.toBe("rgba(0, 0, 0, 0)");
  });
});
