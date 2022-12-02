import { Page, expect } from "@playwright/test";

export default class UserFeedback {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async userFeedback() {
        const { page } = this;
        page.waitForTimeout(3000);
        await page.click("#notification-bell-icon");
        await page.waitForTimeout(3000);
        await page.click("#notification-0");
        await page.click("//button[text()='Data quality']");
        await page
            .locator(".inline-block > .flex > button:nth-child(4)")
            .first()
            .click();
        await page
            .locator(
                "div:nth-child(2) > .inline-block > .flex > button:nth-child(3)"
            )
            .click();
        await page
            .locator(
                "div:nth-child(3) > .inline-block > .flex > button:nth-child(4)"
            )
            .click();
        await page
            .locator(
                "div:nth-child(4) > .inline-block > .flex > button:nth-child(3)"
            )
            .click();
        await page.fill(
            "//textarea[contains(@class,'block px-3')]",
            "Random feedback optional"
        );
        await page.check("#feedback-checkbox");
        await page.click("//button[text()='Submit']");
        await expect(
            page.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText("No new notifications");
    }
}
