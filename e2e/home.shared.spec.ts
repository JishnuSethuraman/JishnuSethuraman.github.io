import { test, expect } from "@playwright/test";
import { trackErrors } from "./utils";

test.describe("portfolio — all devices", () => {
  test("loads the comic cover with no runtime errors", async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto("/");
    await expect(page).toHaveTitle(/ML\/AI Software Engineer Portfolio/);
    await expect(page.locator("h1")).toContainText("JAY");
    await expect(page.getByRole("button", { name: /GO (DARK|LIGHT)/ })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("theme toggle flips to the inky night edition and back", async ({ page }) => {
    await page.goto("/");
    const root = page.locator("[data-theme]");
    await expect(root).toHaveAttribute("data-theme", "light");

    await page.getByRole("button", { name: "GO DARK" }).click();
    await expect(root).toHaveAttribute("data-theme", "dark", { timeout: 7000 });
    await expect(page.locator(".scene-dark")).toBeVisible();
    await expect(page.locator(".scene-light")).toBeHidden();

    // toggle is locked while the 1s page-turn transition plays
    const goLight = page.getByRole("button", { name: "GO LIGHT" });
    await expect(goLight).toBeVisible();
    await page.waitForTimeout(1100);
    await goLight.click();
    await expect(root).toHaveAttribute("data-theme", "light", { timeout: 7000 });
    await expect(page.locator(".scene-light")).toBeVisible();
  });

  test("career timeline expands the earlier chapters", async ({ page }) => {
    await page.goto("/");
    const btn = page.getByRole("button", { name: /READ EARLIER CHAPTERS/ });
    await btn.scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "Rutgers University" })).toBeHidden();

    await btn.click();
    await expect(page.getByRole("button", { name: /HIDE EARLIER CHAPTERS/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Rutgers University" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "PPL Corporation" })).toBeVisible();
  });

  test("a project file opens and links to GitHub", async ({ page }) => {
    await page.goto("/");
    await page.locator("#chapter-2").scrollIntoViewIfNeeded();
    const firstCard = page.locator("[data-role=shelf] > div").first();
    await expect(firstCard.getByRole("heading", { name: "LLM Model Distillation" })).toBeVisible();

    await firstCard.getByRole("button", { name: "OPEN FILE" }).click();
    await expect(firstCard.getByRole("link", { name: /OPEN ON GITHUB/ })).toBeVisible();
    await expect(firstCard.getByRole("link", { name: /OPEN ON GITHUB/ })).toHaveAttribute(
      "href",
      /github\.com/,
    );
    await expect(firstCard.getByRole("button", { name: "CLOSE FILE" })).toBeVisible();
  });

  test("contact links point at the right destinations", async ({ page }) => {
    await page.goto("/");
    const finale = page.locator("#finale");
    await finale.scrollIntoViewIfNeeded();
    await expect(finale.getByRole("link", { name: "RESUME" })).toHaveAttribute(
      "href",
      "/Jayadityan_Sethuraman_Resume.pdf",
    );
    await expect(finale.getByRole("link", { name: "LINKEDIN" })).toHaveAttribute(
      "href",
      /linkedin\.com\/in\/jayset/,
    );
    await expect(finale.getByRole("link", { name: "GITHUB" })).toHaveAttribute(
      "href",
      /github\.com\/JishnuSethuraman/,
    );
    await expect(finale.getByRole("link", { name: /EMAIL/ })).toHaveAttribute("href", /^mailto:/);
  });

  test("no horizontal overflow anywhere on the page", async ({ page }) => {
    await page.goto("/");
    // let the engine apply its layout mode, then sample at several scroll depths
    await page.waitForTimeout(500);
    for (const fraction of [0, 0.25, 0.5, 0.75, 1]) {
      await page.evaluate(
        (f) => window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * f),
        fraction,
      );
      await page.waitForTimeout(150);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `horizontal overflow at ${fraction * 100}% scroll`).toBeLessThanOrEqual(1);
    }
  });
});
