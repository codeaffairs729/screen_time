import { Page, expect } from "@playwright/test";

export default class CheckWorkspaceNotification {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async checkWorkspaceNotification() {
        const { page } = this;
        await page.click("#notification-bell-icon");
        // await page.click("#view-all");
        await expect(
            page.locator("#workspace-notification-heading-0"),
            "Feedback request"
        ).toHaveText("Feedback request");
        await expect(
            page.locator("#workspace-notification-detail-0"),
            "Provide feedback on "
        ).toHaveText("Provide feedback on ");
        await expect(
            page.locator("#workspace-notification-age-0"),
            " just now"
        ).toHaveText(" just now");
        expect(await page.locator("#workspace-notification-dot-0").isVisible()).toBe(
            true
        );
        // await page.click("#workspace-notification-0");
        const [page1] = await Promise.all([
            page.waitForEvent('popup'),
            page.waitForNavigation({ url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/193#feedback` }),
            page.click("#workspace-notification-0")
          ]);

        // await page1.click("#notification-bell-icon"); 
    }
}
