import { test, expect } from "@playwright/test";

/** Desktop cinematic mode: pinned warp hero, engine loop, cursor overlay. */
test.describe("desktop cinematic mode", () => {
  test("hero is pinned for the warp scroll", async ({ page }) => {
    await page.goto("/");
    const pinHeight = await page
      .locator("[data-role=heroPin]")
      .evaluate((el) => el.getBoundingClientRect().height);
    const viewport = page.viewportSize()!;
    expect(pinHeight).toBeGreaterThan(viewport.height * 3);
  });

  test("scrolling engages the warp tunnel and HUD", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const pin = document.querySelector("[data-role=heroPin]")!;
      const total = pin.getBoundingClientRect().height - window.innerHeight;
      window.scrollTo(0, Math.round(total * 0.5));
    });

    await expect
      .poll(
        () =>
          page
            .locator("[data-role=tunnel]")
            .evaluate((el) => parseFloat(getComputedStyle(el).opacity)),
        { timeout: 5000 },
      )
      .toBeGreaterThan(0.5);

    await expect
      .poll(() => page.locator("[data-role=warpPct]").textContent(), { timeout: 5000 })
      .toMatch(/\d+%/);

    // deeper in the pin, the chapter title flies in
    await page.evaluate(() => {
      const pin = document.querySelector("[data-role=heroPin]")!;
      const total = pin.getBoundingClientRect().height - window.innerHeight;
      window.scrollTo(0, Math.round(total * 0.75));
    });
    await expect
      .poll(
        () =>
          page
            .locator("[data-role=tunTitle]")
            .evaluate((el) => parseFloat(getComputedStyle(el).opacity)),
        { timeout: 5000 },
      )
      .toBeGreaterThan(0.5);
    await expect(page.locator("[data-role=tunTitle]")).toContainText("THE ORIGIN RUN");
  });

  test("custom comic cursor is active on fine pointers", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-role=cursor]")).toHaveCSS("display", "block");
  });

  test("spine nav tracks the active chapter", async ({ page }) => {
    await page.goto("/");
    await page.locator("#finale").scrollIntoViewIfNeeded();
    await expect
      .poll(
        () =>
          page
            .locator("[data-spine='#finale']")
            .evaluate((el) => getComputedStyle(el).backgroundColor),
        { timeout: 5000 },
      )
      .toBe("rgb(255, 106, 26)");
  });
});
