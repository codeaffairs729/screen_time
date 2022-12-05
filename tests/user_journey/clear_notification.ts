import { Page, expect } from "@playwright/test";

export default class ClearNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async NotificationClear() {
        const { page } = this;
        await page.click("//img[@alt='Notifications']");
        await page.click("#mark-read");
        await page.waitForTimeout(3000)
        expect(await page.locator("#notification-alert").isVisible()).toBe(
            false
        );
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
        await page.waitForTimeout(3000);
    }
}
