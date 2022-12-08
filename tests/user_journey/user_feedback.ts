import { Page, expect, BrowserContext } from "@playwright/test";
import { WAIT_TIME, FETCH_DELAY_TIME,FETCH_TIME } from "tests/test_time";
export default class UserFeedback {
    readonly page: Page;
    context: BrowserContext;
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }
    sleep = (time: any, page: any) => page.waitForTimeout(time);

    async userFeedback() {
        const { page, context } = this;
        await this.sleep(WAIT_TIME, page);
        // Click on Feedback Notification
        const [newTab] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#notification-0"),
        ]);
        await newTab.waitForLoadState();
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

        await newTab.click("//*[@id='headlessui-tabs-tab-28']");

        await newTab
            .locator(".css-319lph-ValueContainer > .css-6j8wv5-Input")
            .first()
            .click();
        await newTab
            .locator(
                'text=What are the domains and topics related to your potential use case?Select Domain >> input[role="combobox"]'
            )
            .press("Enter");
        await newTab
            .locator(".css-319lph-ValueContainer > .css-6j8wv5-Input")
            .first()
            .click();
        await newTab
            .locator(
                'text=Select applicable topics within domain: Environment and natureoption Air quality >> input[role="combobox"]'
            )
            .press("Enter");
        await newTab
            .locator(".css-319lph-ValueContainer > .css-6j8wv5-Input")
            .click();
        await newTab
            .locator(
                'text=What are the potential use cases for this data?Select from the options below.opt >> input[role="combobox"]'
            )
            .press("Enter");

        await newTab.fill(
            "//*[@id='headlessui-tabs-panel-32']/div/div[2]/div/div[3]/div[2]/textarea",
            "Random "
        );

        await newTab.check("//input[@type='checkbox']");
        await newTab.click("//div[contains(@class,'my-5 mx-3')]//button[1]");
        await this.sleep(FETCH_TIME+FETCH_DELAY_TIME, newTab);
        await newTab.click("#notification-bell-icon");
        await expect(
            newTab.locator("#notification-not-found"),
            "Notification Exists !"
        ).toHaveText("No new notifications");
    }
}
