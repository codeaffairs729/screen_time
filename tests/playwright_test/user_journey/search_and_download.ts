import { Page, expect } from "@playwright/test";

export default class SearchAndDownload {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async SearchDownload() {
        const { page } = this;
        await page.click("//div[contains(@class,'ml-auto flex')]//a[1]");
        await page.waitForTimeout(3000);
        await page.locator("#react-select-product-search-input").fill("covid");
        await page.locator("#react-select-product-search-input").press("Enter");
        await page.waitForNavigation();
        // await page.click("//h4[text()='File Formats']");
        // await page.check("input[value='CSV']");
        await page.click("//div[@id='193']/div[1]/h3[1]/a[1]");
        const [download] = await Promise.all([
            page.waitForEvent("download"),
            page
                .getByRole("row", { name: "Deaths By Health Boa CSV null MB" })
                .getByRole("link")
                .click(),
        ]);
        await page.waitForTimeout(5000);
        const path = await download.path();
        await page.waitForTimeout(3000);
    }
}
