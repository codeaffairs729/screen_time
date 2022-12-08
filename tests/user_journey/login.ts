import { Page, expect } from "@playwright/test";
import { WAIT_TIME } from "tests/test_time";

const EMAIL = "test@test.com";
const PASSWORD = "Test@1234";
export default class Login {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    sleep = (time: any) => this.page.waitForTimeout(time);

    async load() {
        await this.page.goto(`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/login`);
        await this.page.waitForSelector(
            "button[data-selector='signin-button']"
        );
        await this.page.waitForSelector(
            "(//div[contains(@class,'relative w-full')]//input)[1]"
        );
        await this.page.waitForSelector(
            "(//div[contains(@class,'relative w-full')]//input)[2]"
        );
    }
    async LogIn() {
        const { page } = this;
        await this.load();
        await page.fill("input[type='email']", EMAIL);
        await page.fill("input[type='password']", PASSWORD);
        await page.click("button[data-selector='signin-button']");
        await page.waitForNavigation();
    }

    async checkUser() {
        const { page } = this;
        expect(
            page.locator("//div[@role='status']"),
            "Login Failed"
        ).toHaveText("You have successfully signed in");
        await page.waitForLoadState();
        expect(await page.locator("#notification-bell-icon").isVisible()).toBe(
            true
        );
        //profile dropdown
        await page.click(
            "(//div[@class='relative inline-block text-left']//button[@class='cursor-pointer flex items-center ml-6 hover:text-dtech-main-dark outline-none'])[1]"
        );
        await this.sleep(WAIT_TIME);
        let user: any = await page.locator("#menu-title").textContent();
        await expect(
            page.locator("#menu-title"),
            "User name Doesn't match!"
        ).toHaveText(user);
    }
}
