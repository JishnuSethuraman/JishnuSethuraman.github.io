import { test, expect } from "@playwright/test";

// LLM-drafted (Qwen2.5-Coder-7B local), human-vetted: the ray-layer opacity
// budget is the regression test for the "spinning lines too loud" review fix.
test.describe("hero — desktop cinematic details", () => {
  test("speed-line layers exist but stay subtle", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("[data-role=heroPin]");
    const lightRays = hero.locator(".scene-light .ray-layer");
    await expect(lightRays).toHaveCount(2);
    for (let i = 0; i < 2; i++) {
      const opacity = await lightRays
        .nth(i)
        .evaluate((el) => parseFloat(getComputedStyle(el).opacity));
      expect(opacity, "toned-down speed lines must stay ≤ 0.08").toBeLessThanOrEqual(0.08);
    }
  });

  test("floating code tokens decorate the scene", async ({ page }) => {
    await page.goto("/");
    const scene = page.locator(".scene-light");
    await expect(scene.getByText("def train()")).toBeVisible();
    await expect(scene.getByText("epoch 42")).toBeVisible();
    await expect(scene.getByText("torch.nn")).toBeVisible();
  });

  test("skills marquee runs along the bottom of the cover", async ({ page }) => {
    await page.goto("/");
    await expect(
      page
        .locator(".scene-light")
        .getByText(/MACHINE.LEARNING.\/\/.LLM.PIPELINES/)
        .first(),
    ).toBeVisible();
  });

  test("intro curtain plays once and removes itself", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-role=intro]")).toHaveCSS("display", "none", {
      timeout: 6000,
    });
  });
});
