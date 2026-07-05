import { test, expect } from "@playwright/test";
import { trackErrors } from "./utils";

/**
 * Mobile "lite" mode — the regression suite for the mobile Safari memory
 * crash. On coarse-pointer/small viewports the engine must collapse the
 * pinned cinematic layout and the heavy raster layers must be gone.
 */
test.describe("mobile lite mode", () => {
  test("hero and projects are not pinned", async ({ page }) => {
    await page.goto("/");
    const viewport = page.viewportSize()!;

    await expect
      .poll(() =>
        page.locator("[data-role=heroPin]").evaluate((el) => el.getBoundingClientRect().height),
      )
      .toBeLessThan(viewport.height * 1.5);

    await expect(page.locator("[data-role=projSticky]")).toHaveCSS("position", "relative");
  });

  test("heavy cinematic machinery is disabled", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-role=tunnel]")).toHaveCSS("display", "none");
    await expect(page.locator("[data-role=intro]")).toHaveCSS("display", "none");
    await expect(page.locator("[data-role=cursor]")).toHaveCSS("display", "none");

    // every giant conic-gradient "speed line" layer must be dropped
    const rayCount = await page.locator(".ray-layer").count();
    expect(rayCount).toBeGreaterThan(0);
    for (let i = 0; i < rayCount; i++) {
      await expect(page.locator(".ray-layer").nth(i)).toHaveCSS("display", "none");
    }
  });

  test("full-page scroll survives without a reload or errors", async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto("/");

    // walk the page the way a swipe-scroll would
    for (const fraction of [0.2, 0.4, 0.6, 0.8, 1]) {
      await page.evaluate(
        (f) => window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * f),
        fraction,
      );
      await page.waitForTimeout(200);
    }

    await expect(
      page.locator("#finale").getByRole("heading", { name: /LET.S BUILD/ }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("project shelf swipes natively", async ({ page }) => {
    await page.goto("/");
    const shelf = page.locator("[data-role=shelf]");
    await shelf.scrollIntoViewIfNeeded();

    const { scrollWidth, clientWidth, overflowX } = await shelf.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      overflowX: getComputedStyle(el).overflowX,
    }));
    expect(overflowX).toBe("auto");
    expect(scrollWidth).toBeGreaterThan(clientWidth);

    await shelf.evaluate((el) => (el.scrollLeft = 200));
    await expect.poll(() => shelf.evaluate((el) => el.scrollLeft)).toBeGreaterThan(100);
  });
});
