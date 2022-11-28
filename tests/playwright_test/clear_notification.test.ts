import { chromium, expect, test } from "@playwright/test";

test("CLEAR ALL NOTIFICATIONS", async () => {
    const browser = await chromium.launch({
        headless: true,
    });
    const context = await browser.newContext({
        storageState: "./auth.json",
    });
    const page = await context.newPage();
    await page.goto(`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/workspace`);
    await page.click("//img[@alt='Notifications']");
    await page.click("#mark-read");
    expect(await page.locator("#notification-alert").isVisible()).toBe(false);
    await page.click("#notification-bell-icon"); // bell icon
    await expect(
        page.locator("#notification-not-found"),
        "Notification Exists !"
    ).toHaveText("No new notifications");
    await page.waitForTimeout(3000);
    await expect(
        page.locator("#notification-tab"),
        "Notification present"
    ).toHaveText("No new notifications");
});
