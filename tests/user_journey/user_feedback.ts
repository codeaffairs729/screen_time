import { Page, expect, BrowserContext } from "@playwright/test";

export default class UserFeedback {
    readonly page: Page;
    context: BrowserContext;
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }
    sleep = (time: any) => this.page.waitForTimeout(time);

    async userFeedback() {
        const { page, context } = this;
        await this.sleep(3000);
        const [newTab] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#notification-0"),
        ]);
        await newTab.click("//button[text()='Data quality']");
        await newTab
            .locator(".inline-block > .flex > button:nth-child(4)")
            .first()
            .click();
        await newTab
            .locator(
                "div:nth-child(2) > .inline-block > .flex > button:nth-child(3)"
            )
            .click();
        await newTab
            .locator(
                "div:nth-child(3) > .inline-block > .flex > button:nth-child(4)"
            )
            .click();
        await newTab
            .locator(
                "div:nth-child(4) > .inline-block > .flex > button:nth-child(3)"
            )
            .click();
        await newTab.fill(
            "//textarea[contains(@class,'block px-3')]",
            "Random feedback optional"
        );
        await newTab.check("(//div[@class='flex items-center']//input)[2]");
        await newTab.click("//button[text()='Submit']");
        await newTab.waitForTimeout(3000);

        await newTab.click("#notification-bell-icon");
        await expect(
            newTab.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText("No new notifications");
    }
}
