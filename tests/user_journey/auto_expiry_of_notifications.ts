import { Page, expect } from "@playwright/test";
import {
    AUTO_EXPIRY_TIME,
    WAIT_TIME,
    FETCH_DELAY_TIME,
} from "tests/test_time";
export default class AutoExpiryOfNotification {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    sleep = (time: any) => this.page.waitForTimeout(time);

    async autoExpiryOfNotifications() {
        const { page } = this;
        await this.sleep(WAIT_TIME);
        await page.click("#notification-bell-icon");
        await page.waitForLoadState();
        let heading1: any = await page
            .locator("#notification-heading-0")
            .textContent();
        await expect(
            page.locator("#notification-heading-0"),
            "heading do not match !"
        ).toHaveText(heading1);
        let detail1: any = await page
            .locator("#notification-detail-0")
            .textContent();
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
        let heading2: any = await page
            .locator("#notification-heading-1")
            .textContent();
        await expect(
            page.locator("#notification-heading-1"),
            "heading do not match !"
        ).toHaveText(heading2);
        let detail2: any = await page
            .locator("#notification-detail-1")
            .textContent();
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
        await this.sleep(AUTO_EXPIRY_TIME + FETCH_DELAY_TIME);
        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText("No new notifications");
    }
}
