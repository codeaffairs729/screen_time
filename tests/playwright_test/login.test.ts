import { chromium, expect, test } from "@playwright/test";

test("LOG IN AS A REGISTERED USER", async () => {
    const browser = await chromium.launch({
        headless: true,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/login`);
    await page.fill("input[type='email']", "a@a.com");
    await page.fill("input[type='password']", "pass");
    await page.click("button[data-selector='signin-button']");
    await page.waitForTimeout(3000);
    expect(page.locator("//div[@role='status']"), "Login Failed").toHaveText(
        "You have successfully signed in"
    );
    await page.waitForTimeout(2000);
    await page.click("#notification-bell-icon"); // bell icon
    await page.click("#profile-dropdown"); //profile dropdown
    await page.waitForTimeout(2000);
    await expect(
        page.locator("#menu-title"),
        "User name Doesn't match!"
    ).toHaveText("Hi, John Doe!");
});
