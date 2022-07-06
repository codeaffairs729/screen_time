import { test, expect } from "@playwright/test";

const testNavItem = () => {};

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:3000/");
  });

  // test("perform a search", async ({ page }) => {
  //   // Go to http://localhost:3000/
  //   // await page.goto("http://localhost:3000/");
  //   // Click .css-6j8wv5-Input
  //   // await page.locator('.css-6j8wv5-Input').click();
  //   // Fill input[role="combobox"]
  //   await page
  //     .locator('input[id="react-select-product-search-input"]')
  //     .fill("covid");
  //   // Press Enter
  //   await Promise.all([
  //     page.waitForNavigation(/*{ url: 'http://localhost:3000/search?q=covid' }*/),
  //     page
  //       .locator('input[id="react-select-product-search-input"]')
  //       .press("Enter"),
  //   ]);
  //   // Click button:has-text("Most Relevant")
  //   await page.locator('button:has-text("Most Relevant")').click();
  //   // Click div[role="menuitem"]:has-text("Most Relevant")
  //   await page.locator('div[role="menuitem"]:has-text("High Quality")').click();
  //   await page.pause();
  // });

  test.describe.parallel("Home nav item", () => {
    const selector = 'nav a:has-text("Home")';
    test("existence and text", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      await expect(el).toHaveCount(1);
    });
    test("styling", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      await expect(el).toHaveCSS(
        "text-decoration",
        "underline 4px solid rgb(173, 29, 235)"
      );
      await expect(el).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      const box = await el.boundingBox();
      expect(box?.y).toEqual(33.5); // Check for y position
      await page.pause();
    });
    test("position", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      const box = await el.boundingBox();
      expect(box?.y).toEqual(33.5); // Check for y position
      await page.pause();
    });
  });
  test.describe.parallel("API nav item", () => {
    const selector = 'nav a:has-text("API")';
    test("existence and text", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      await expect(el).toHaveCount(1);
    });
    test("styling", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      await expect(el).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      const box = await el.boundingBox();
      expect(box?.y).toEqual(33.5); // Check for y position
      await page.pause();
    });
    test("position", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      const box = await el.boundingBox();
      expect(box?.y).toEqual(33.5); // Check for y position
      await page.pause();
    });
  });
  test.describe.parallel("Sign Up item", () => {
    const selector = 'nav a:has-text("Sign Up")';
    test("existence and text", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      await expect(el).toHaveCount(1);
    });
    test("styling", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      await expect(el).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      const box = await el.boundingBox();
      expect(box?.y).toEqual(33.5); // Check for y position
      await page.pause();
    });
    test("position", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      const box = await el.boundingBox();
      expect(box?.y).toEqual(33.5); // Check for y position
      await page.pause();
    });
  });
  test.describe.parallel("Log In item", () => {
    const selector = 'nav a:has-text("Sign Up")';
    test("existence and text", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      await expect(el).toHaveCount(1);
    });
    test("styling", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      await expect(el).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      const box = await el.boundingBox();
      expect(box?.y).toEqual(33.5); // Check for y position
      await page.pause();
    });
    test("position", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      const box = await el.boundingBox();
      expect(box?.y).toEqual(33.5); // Check for y position
      await page.pause();
    });
  });

  test.describe.parallel("Profile Menu", () => {
    const selector =
      "nav button[aria-label='profile dropdown button']";
    test("Position and size", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      const box = await el.boundingBox();
      expect(box?.y).toEqual(20);
      expect(box?.width).toEqual(40);
      await page.pause();
    });
    test("Click behaviour", async ({ page }) => {
      await page.waitForSelector(selector);
      const el = page.locator(selector);
      const menuSelector = "nav div[aria-label='profile dropdown menu']";
      await expect(page.locator(menuSelector)).toHaveCount(0);
      el.click();
      await page.waitForSelector(menuSelector);
      await expect(page.locator(menuSelector)).toHaveCount(1);
    });
    test("Verify profile image", async ({ page }) => {
      const imgSelector = `${selector} img[alt="profile dropdown"]`
      await page.waitForSelector(imgSelector);
      const el = page.locator(imgSelector);
      const box = await el.boundingBox();
      expect(box?.y).toEqual(20);
      expect(box?.width).toEqual(40);
      expect(box?.height).toEqual(40);
      await page.pause();
    });
  });
});
