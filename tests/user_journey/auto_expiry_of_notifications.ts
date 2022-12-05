import { Page, expect } from "@playwright/test";

export default class AutoExpiryOfNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async autoExpiryOfNotifications() {
        const { page } = this;
        await page.waitForTimeout(3000);
        await page.click("#notification-bell-icon");
        await page.waitForTimeout(3000);
        await expect(
            page.locator("#notification-heading-0"),
            "Feedback request"
        ).toHaveText("Feedback request");
        await expect(
            page.locator("#notification-detail-0"),
            "Provide feedback on"
        ).toHaveText("Provide feedback on");
        await expect(
            page.locator("#notification-age-0"),
            " just now"
        ).toHaveText(" just now");
        expect(await page.locator("#notification-dot-0").isVisible()).toBe(
            true
        );
        await page.waitForTimeout(30000); // TimeOut Expiry of Notification
        await page.click("#notification-bell-icon");
        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText("No new notifications");
    }
}
