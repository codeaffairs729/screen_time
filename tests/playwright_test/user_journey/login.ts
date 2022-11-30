import { Page, expect } from "@playwright/test";

export default class Login {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async load() {
        await this.page.goto(`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/login`);
        await this.page.waitForSelector(
            "button[data-selector='signin-button']"
        );
    }
    async LogIn() {
        const { page } = this;
        await this.load();
        await page.fill("input[type='email']", "a@a.com");
        await page.fill("input[type='password']", "pass");
        await page.click("button[data-selector='signin-button']");
        await page.waitForNavigation();
    }

    async checkUser() {
        const { page } = this;
        expect(
            page.locator("//div[@role='status']"),
            "Login Failed"
        ).toHaveText("You have successfully signed in");
        await page.waitForTimeout(2000);
        await page.click("#notification-bell-icon"); // bell icon
        await page.click("#profile-dropdown"); //profile dropdown
        await page.waitForTimeout(2000);
        await expect(
            page.locator("#menu-title"),
            "User name Doesn't match!"
        ).toHaveText("Hi, John Doe!");
        await page.waitForTimeout(2000);
    }
}
