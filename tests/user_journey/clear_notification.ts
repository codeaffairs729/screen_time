import { Page, expect } from "@playwright/test";

export default class ClearNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    sleep = (time: any) => this.page.waitForTimeout(time);

    async NotificationClear() {
        const { page } = this;
        await page.click("//img[@alt='Notifications']");
        await page.waitForTimeout(3000)
        await page.click("#mark-read");
        await this.sleep(3000);
        expect(await page.locator("#notification-alert").isVisible()).toBe(
            false
        );
        await page.click("#notification-bell-icon"); // bell icon
        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText("No new notifications");
        await this.sleep(3000);
        await expect(
            page.locator("#notification-tab"),
            "Notification present"
        ).toHaveText("No new notifications");
        await this.sleep(3000);
    }
}
