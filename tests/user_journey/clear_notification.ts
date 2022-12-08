import { Page, expect } from "@playwright/test";
import { WAIT_TIME } from "tests/test_time";
export default class ClearNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    sleep = (time: any) => this.page.waitForTimeout(time);

    async NotificationClear() {
        const { page } = this;
        //profile dropdown
        await page.click(
            "(//button[contains(@class,'cursor-pointer flex')]//span)[2]"
        );
        await Promise.all([
            page.waitForNavigation({
                url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/workspace`,
            }),
            page
                .locator("//div[@id='menu-title']/following-sibling::a[1]")
                .click(),
        ]);
        await page.click("//img[@alt='Notifications']");
        await this.sleep(WAIT_TIME);
        await page.click("#mark-read");
        await this.sleep(WAIT_TIME);
        expect(await page.locator("#notification-alert").isVisible()).toBe(
            false
        );
        await page.click("#notification-bell-icon"); // bell icon
        const notification: any = await page.locator("#notification-not-found").textContent();
        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText(notification);
        await this.sleep(WAIT_TIME);
        await expect(
            page.locator("#notification-tab"),
            "Notification present"
        ).toHaveText("No new notifications");
        await this.sleep(WAIT_TIME);
    }
}
