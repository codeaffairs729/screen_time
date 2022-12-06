import { Page, expect, BrowserContext } from "@playwright/test";

export default class CheckWorkspaceNotification {
    readonly page: Page;
    context: BrowserContext;
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async checkWorkspaceNotification() {
        const { page, context } = this;
        await page.click("#notification-bell-icon");
        await page.waitForLoadState();
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
        expect(
            await page.locator("#workspace-notification-dot-0").isVisible()
        ).toBe(true);
        const [newTab] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#workspace-notification-0"),
        ]);
        await newTab.waitForLoadState();
        expect(newTab.url()).toContain("feedback");
        await page.bringToFront();
    }
}
