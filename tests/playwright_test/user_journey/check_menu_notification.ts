import { Page, expect } from "@playwright/test";

export default class CheckMenuNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async CheckMenu() {
        const { page } = this;
        await page.waitForTimeout(6000);
        expect(await page.locator("#notification-alert").isVisible()).toBe(
            true
        );
        await page.click("#notification-bell-icon");
        await page.waitForTimeout(3000);
        await page.click("#feedback-request-0");
        await page.waitForTimeout(3000);
    }
}
