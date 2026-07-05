import { test, expect } from "@playwright/test";

// LLM-drafted (Qwen2.5-Coder-7B local), human-vetted: locators scoped to the
// topbar (chapter links also exist in the spine nav) and responsive behavior
// asserted per device instead of assuming desktop.
test.describe("top bar", () => {
  test("brand and theme toggle are always present", async ({ page }) => {
    await page.goto("/");
    const topbar = page.locator("[data-role=topbar]");
    await expect(topbar.getByText("JS", { exact: true })).toBeVisible();
    await expect(topbar.getByRole("button", { name: /GO (DARK|LIGHT)/ })).toBeVisible();
  });

  test("email link is a mailto and chapter links respect the breakpoint", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const topbar = page.locator("[data-role=topbar]");
    await expect(topbar.getByRole("link", { name: "EMAIL" })).toHaveAttribute("href", /^mailto:/);
    for (const name of ["CH.1", "CH.2", "CH.3"]) {
      const link = topbar.getByRole("link", { name });
      if (isMobile) {
        // ≤720px hides the chapter links to keep the bar on one line
        await expect(link).toBeHidden();
      } else {
        await expect(link).toBeVisible();
      }
    }
  });

  test("chapter links scroll the page to their sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "chapter links are hidden on mobile");
    await page.goto("/");
    const topbar = page.locator("[data-role=topbar]");

    await topbar.getByRole("link", { name: "CH.1" }).click();
    await expect
      .poll(async () => {
        return page
          .locator("#chapter-1")
          .evaluate((el) => Math.abs(el.getBoundingClientRect().top) < window.innerHeight);
      })
      .toBe(true);

    await topbar.getByRole("link", { name: "CH.3" }).click();
    await expect
      .poll(async () => {
        return page
          .locator("#chapter-3")
          .evaluate((el) => Math.abs(el.getBoundingClientRect().top) < window.innerHeight);
      })
      .toBe(true);
  });
});
