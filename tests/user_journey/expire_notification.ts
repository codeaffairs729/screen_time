import { Page, expect } from "@playwright/test";

export default class ExpireNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async NotificationExpire() {
        const { page } = this;
        page.waitForTimeout(7000);
        expect(await page.locator("#notification-alert").isVisible()).toBe(
            false
        );
        await page.click("#notification-bell-icon"); // bell icon

        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText("No new notifications");
        await page.waitForTimeout(3000);
        await page.click("#profile-dropdown"); //profile dropdown
        await Promise.all([
            page.waitForNavigation({ url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/workspace` }),
            page.locator('text=My Workspace').click()
          ]);
        await page.waitForTimeout(3000);
        await page.locator('button[role="tab"]:has-text("Notifications")').click();
        await expect(
            page.locator("#notification-tab"),
            "Notification present"
        ).toHaveText("No new notifications");
        await page.waitForTimeout(3000);
    }
}
