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
        let heading1: any = await page
            .locator("#workspace-notification-heading-0")
            .textContent();
        let detail1: any = await page
            .locator("#workspace-notification-detail-0")
            .textContent();
        let age1: any = await page
            .locator("#workspace-notification-age-0")
            .textContent();
        let heading2: any = await page
            .locator("#workspace-notification-heading-1")
            .textContent();
        let detail2: any = await page
            .locator("#workspace-notification-detail-1")
            .textContent();
        let age2: any = await page
            .locator("#workspace-notification-age-1")
            .textContent();
        await expect(
            page.locator("#workspace-notification-heading-0"),
            "Heading doesn't match!"
        ).toHaveText(heading1);
        await expect(
            page.locator("#workspace-notification-detail-0"),
            "Details doesn't match!"
        ).toHaveText(detail1);
        await expect(
            page.locator("#workspace-notification-age-0"),
            "age doesn't match!"
        ).toHaveText(age1);
        expect(
            await page.locator("#workspace-notification-dot-0").isVisible()
        ).toBe(true);

        await expect(
            page.locator("#workspace-notification-heading-1"),
            "Heading doesn't match!"
        ).toHaveText(heading2);
        await expect(
            page.locator("#workspace-notification-detail-1"),
            "Details doesn't match!"
        ).toHaveText(detail2);
        await expect(
            page.locator("#workspace-notification-age-1"),
            "age doesn't match!"
        ).toHaveText(age2);
        expect(
            await page.locator("#workspace-notification-dot-1").isVisible()
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
