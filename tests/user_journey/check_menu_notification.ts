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
        await page.pause()  
        // await page.click("#notification-0");
        const [page1] = await Promise.all([
            page.waitForEvent('popup'),
            page.click("#notification-0"),
            page.waitForNavigation({ url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/193#feedback` }),
            
          ]);
        await page1.pause()  
        await page1.locator('#notification-bell-icon').click();
        await page1.click("#view-all")
    }
}
