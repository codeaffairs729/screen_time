import { Page, expect } from "@playwright/test";

export default class ExpireNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async NotificationExpire() {
        const { page } = this;
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
        await page.getByRole("link", { name: "My Workspace" }).click();
        await page.waitForNavigation();
        await page.click("//img[@alt='Notifications']");
        await expect(
            page.locator("#notification-tab"),
            "Notification present"
        ).toHaveText("No new notifications");
        await page.waitForTimeout(3000);
    }
}
