import { Page, expect } from "@playwright/test";

export default class AutoExpiryOfNotification {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    sleep = (time: any) => this.page.waitForTimeout(time);

    async autoExpiryOfNotifications() {
        const { page } = this;
        await this.sleep(3000);
        await page.click("#notification-bell-icon");
        await page.waitForLoadState();
        await expect(
            page.locator("#notification-heading-0"),
            "Feedback request"
        ).toHaveText("Feedback request");

        let notification_detail: any = await page
            .locator("#notification-detail-0")
            .textContent();
        await expect(
            page.locator("#notification-detail-0"),
            "Provide feedback on"
        ).toHaveText(notification_detail);
        let notification_age: any = await page
            .locator("#notification-age-0")
            .textContent();
        await expect(
            page.locator("#notification-age-0"),
            "Error in Date!"
        ).toHaveText(notification_age);
        expect(await page.locator("#notification-dot-0").isVisible()).toBe(
            true
        );
        // TimeOut Expiry of Notification
        await this.sleep(62000);
        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText("No new notifications");
    }
}
