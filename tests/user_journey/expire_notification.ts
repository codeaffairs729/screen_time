import { Page, expect } from "@playwright/test";
import { WAIT_TIME,AUTO_EXPIRY_TIME,FETCH_TIME } from "tests/test_time";
export default class ExpireNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    sleep = (time: any) => this.page.waitForTimeout(time);

    async NotificationExpire() {
        const { page } = this;
        await page.click("//div[contains(@class,'ml-auto flex')]//a[1]"); // home link
        await this.sleep(AUTO_EXPIRY_TIME+FETCH_TIME);
        expect(await page.locator("#notification-alert").isVisible()).toBe(
            false
        );
        await page.click("#notification-bell-icon"); // bell icon
        await this.sleep(WAIT_TIME);
        const notification: any = await page.locator("#notification-not-found").textContent();
        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText(notification);
        await this.sleep(WAIT_TIME);
        await page.click("(//div[@class='relative inline-block text-left']//button[@class='cursor-pointer flex items-center ml-6 hover:text-dtech-main-dark outline-none'])[1]"); //profile dropdown
        // My WorkSpace
        await Promise.all([
            page.waitForNavigation({
                url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/workspace`,
            }),
            page.locator("//div[@id='menu-title']/following-sibling::a[1]").click(),
        ]);
        await this.sleep(WAIT_TIME);
        await page
            .locator('button[role="tab"]:has-text("Notifications")')
            .click();
        await expect(
            page.locator("#notification-tab"),
            "Notification present"
        ).toHaveText("No new notifications");
    }
}
