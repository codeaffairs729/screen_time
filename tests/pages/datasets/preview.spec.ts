import { test, expect, Page } from "@playwright/test";

const dataset_geojson = {
    id: 142,
};
const dataset_excel = {
    id: 1427,
};
let page: Page;

test.describe("Dataset preview", () => {
    test.beforeAll(async ({ browser }) => {
        try {
            page = await browser.newPage();
        } catch (error) {
            console.log("beforeAll error", error);
        }
    });
    test(`Go to dataset ${dataset_geojson["id"]} page`, async () => {
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/dataset-preview/datafiles?dataset_id=${dataset_geojson["id"]}`
            ),
            page.goto(
                `http://localhost:3000/datasets/${dataset_geojson["id"]}`
            ),
        ]);
    });
    test("Sample", async () => {
        const sample_html = await page
            .locator('table[id="tableSample"]')
            .innerHTML();

        expect(sample_html).toBeTruthy();
        expect(sample_html.includes("thead")).toBeTruthy();
        expect(sample_html.includes("tbody")).toBeTruthy();
    });
    test("Summary", async () => {
        const summary_html = await page
            .locator('table[id="tableSummary"]')
            .innerHTML();

        expect(summary_html).toBeTruthy();
        expect(summary_html.includes("thead")).toBeTruthy();
        expect(summary_html.includes("tbody")).toBeTruthy();
    });
    test("Geographic bounds", async () => {
        const geo_div = page.locator('div[id="previewGeographic"] > div');

        await expect(geo_div).toHaveClass(
            "leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
        );
    });
    test(`Go to dataset ${dataset_excel["id"]} page`, async () => {
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/dataset-preview/datafiles?dataset_id=${dataset_excel["id"]}`
            ),
            page.goto(`http://localhost:3000/datasets/${dataset_excel["id"]}`),
        ]);

        // // TODO: resolve locator to elements on page and map them to their text content.
        // // Note: the code inside evaluateAll runs in page, you can call any DOM apis there.
        // const tab_selector = await page.locator("ul.inline-flex > li > button");
        // const tab_list = await tab_selector.evaluateAll((list) =>
        //     list.map((element) => element.innerHTML)
        // );

        const tab_list = [
            "All deaths",
            "Cancer - all sites",
            "Cancer - stomach",
        ];
        expect(tab_list.length).toBeGreaterThan(1);

        // Click the first tab
        await page.locator(`text=${tab_list[0]}`).click();

        const sample_html_1 = await page
            .locator('table[id="tableSample"]')
            .innerHTML();

        expect(sample_html_1).toBeTruthy();
        expect(sample_html_1.includes("thead")).toBeTruthy();
        expect(sample_html_1.includes("tbody")).toBeTruthy();

        const summary_html_1 = await page
            .locator('table[id="tableSummary"]')
            .innerHTML();

        expect(summary_html_1).toBeTruthy();
        expect(summary_html_1.includes("thead")).toBeTruthy();
        expect(summary_html_1.includes("tbody")).toBeTruthy();

        // Click the first tab
        await page.locator(`text=${tab_list[1]}`).click();

        const sample_html_2 = await page
            .locator('table[id="tableSample"]')
            .innerHTML();

        expect(sample_html_2).toBeTruthy();
        expect(sample_html_2.includes("thead")).toBeTruthy();
        expect(sample_html_2.includes("tbody")).toBeTruthy();

        const summary_html_2 = await page
            .locator('table[id="tableSummary"]')
            .innerHTML();

        expect(summary_html_2).toBeTruthy();
        expect(summary_html_2.includes("thead")).toBeTruthy();
        expect(summary_html_2.includes("tbody")).toBeTruthy();

        expect(sample_html_1).not.toEqual(sample_html_2);
        expect(summary_html_1).not.toEqual(summary_html_2);
    });
});
