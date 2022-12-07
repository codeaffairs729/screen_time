import { Page, expect, BrowserContext } from "@playwright/test";

export default class CheckMenuNotification {
    readonly page: Page;
    context: BrowserContext;
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async CheckMenu() {
        const { page, context } = this;
        await page.click("#view-all");
        await page.waitForTimeout(6000);
        expect(await page.locator("#notification-alert").isVisible()).toBe(
            true
        );
        await page.click("#notification-bell-icon");
        await page.waitForLoadState();
        let heading1: any = await page.locator("#notification-heading-0").textContent();
        await expect(
            page.locator("#notification-heading-0"),
            "heading do not match !"
        ).toHaveText(heading1);
        let detail1: any = await page.locator("#notification-detail-0").textContent();
        await expect(
            page.locator("#notification-detail-0"),
            "Detail doesn't match!"
        ).toHaveText(detail1);
        let age1: any = await page.locator("#notification-age-0").textContent();
        await expect(
            page.locator("#notification-age-0"),
            "age Doesn't Match !"
        ).toHaveText(age1);
        expect(await page.locator("#notification-dot-0").isVisible()).toBe(
            true
        );
        let heading2: any = await page.locator("#notification-heading-1").textContent();
        await expect(
            page.locator("#notification-heading-1"),
            "heading do not match !"
        ).toHaveText(heading2);
        let detail2: any = await page.locator("#notification-detail-1").textContent();
        await expect(
            page.locator("#notification-detail-1"),
            "Detail doesn't match!"
        ).toHaveText(detail2);
        let age2: any = await page.locator("#notification-age-1").textContent();
        await expect(
            page.locator("#notification-age-1"),
            "age Doesn't Match !"
        ).toHaveText(age2);
        expect(await page.locator("#notification-dot-1").isVisible()).toBe(
            true
        );
        const [newTab] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#notification-0"),
        ]);
        await newTab.waitForLoadState();
        expect(newTab.url()).toContain("feedback");
        await page.bringToFront();

    }
}
