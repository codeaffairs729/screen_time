import { Page, expect } from "@playwright/test";

export default class ClearNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    sleep = (time: any) => this.page.waitForTimeout(time);

    async NotificationClear() {
        const { page } = this;
        await page.click(
            "(//button[contains(@class,'cursor-pointer flex')]//span)[2]"
        ); //profile dropdown
        await Promise.all([
            page.waitForNavigation({
                url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/workspace`,
            }),
            page
                .locator("//div[@id='menu-title']/following-sibling::a[1]")
                .click(),
        ]);
        await page.click("//img[@alt='Notifications']");
        await this.sleep(3000);
        await page.click("#mark-read");
        await this.sleep(3000);
        expect(await page.locator("#notification-alert").isVisible()).toBe(
            false
        );
        await page.click("#notification-bell-icon"); // bell icon
        const notification: any = await page.locator("#notification-not-found").textContent();
        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText(notification);
        await this.sleep(3000);
        await expect(
            page.locator("#notification-tab"),
            "Notification present"
        ).toHaveText("No new notifications");
        await this.sleep(3000);
    }
}
