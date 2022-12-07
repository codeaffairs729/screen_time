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
        let heading1: any = await page.locator("#notification-heading-0").textContent();
        await expect(
            page.locator("#notification-heading-0"),
            "heading do not match !"
        ).toHaveText(heading1);
        let detail1: any = await page.locator("#notification-detail-0").textContent();
        await expect(
            page.locator("#notification-detail-0"),
            "Detail doesn't match!"
        ).toHaveText(detail1);
        let age1: any = await page.locator("#notification-age-0").textContent();
        await expect(
            page.locator("#notification-age-0"),
            "age Doesn't Match !"
        ).toHaveText(age1);
        expect(await page.locator("#notification-dot-0").isVisible()).toBe(
            true
        );
        let heading2: any = await page.locator("#notification-heading-1").textContent();
        await expect(
            page.locator("#notification-heading-1"),
            "heading do not match !"
        ).toHaveText(heading2);
        let detail2: any = await page.locator("#notification-detail-1").textContent();
        await expect(
            page.locator("#notification-detail-1"),
            "Detail doesn't match!"
        ).toHaveText(detail2);
        let age2: any = await page.locator("#notification-age-1").textContent();
        await expect(
            page.locator("#notification-age-1"),
            "age Doesn't Match !"
        ).toHaveText(age2);
        expect(await page.locator("#notification-dot-1").isVisible()).toBe(
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
