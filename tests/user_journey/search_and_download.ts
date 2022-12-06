import { Page, expect } from "@playwright/test";

export default class SearchAndDownload {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    sleep = (time: any) => this.page.waitForTimeout(time);
    async SearchDownload() {
        const { page } = this;
        await page.click("//div[contains(@class,'ml-auto flex')]//a[1]");
        await this.sleep(3000);
        await page.locator("#react-select-product-search-input").fill("covid");
        await page.locator("#react-select-product-search-input").press("Enter");
        await this.sleep(3000);
        // await page.click("//h4[text()='File Formats']");
        // await page.check("input[value='CSV']");
        // await page.click("text=COVID-19 Wider Impacts - Excess Deaths");
        let search_title: any = await page.locator("(//div[@data-test-id='results table']//div[@data-testid='search-item']//div[@class='flex flex-col flex-1']//h3[1]//a[1])[1]").textContent();
        console.log(search_title);
        await page.click("(//div[@data-test-id='results table']//div[@data-testid='search-item']//div[@class='flex flex-col flex-1']//h3[1]//a[1])[1]")
        // let title: any = await page.locator("//h4[@data-testid='dataset-title']").textContent();
        await page.waitForTimeout(4000);
        console.log( page.locator("h4[data-testid='dataset-title']"));
        await expect(
            page.locator("h4[data-testid='dataset-title']"),
            "Title Doesn't match!"
        ).toHaveText(search_title);

        await Promise.all([
            page.waitForEvent("download"),
            page
                .locator("//table[contains(@class,'min-w-max w-full')]/tbody[1]/tr[1]/td[4]/a[1]")
                .click(),
        ]);
        // await page.waitForSelector("#notification-alert");
        await page.click("#notification-bell-icon");
    }
}
