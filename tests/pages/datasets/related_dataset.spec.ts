import { test, expect, Page } from "@playwright/test";

// npx playwright test tests/pages/datasets/related_dataset.spec.ts --project=chromium --headed

let page: Page;

const test_param = {
    search_query: "covid",
    dataset_id: 1307,
};

test.describe("Dataset preview", () => {
    test.beforeAll(async ({ browser }) => {
        try {
            page = await browser.newPage();
        } catch (error) {
            console.log("beforeAll error", error);
        }
    });
    test(`Go to search query results for: ${test_param["search_query"]}`, async () => {
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8001/proxy/v3/datasets?searchquery=${test_param["search_query"]}&pagesize=20&pagenum=1&sort_by=relevance `
            ),
            page.goto(
                `http://localhost:3000/search?q=${test_param["search_query"]}`
            ),
        ]);

        const search_results = page.locator("data-testid=search-item");
        const count_search_results = await search_results.count();
        console.log(count_search_results);
        expect(count_search_results).toBeGreaterThan(0);

        const dataset_id = await search_results.nth(0).getAttribute("id");
        const dataset_title: string = (await search_results
            .nth(0)
            .getAttribute("data-title")) as string;

        console.log(dataset_id, dataset_title);

        await Promise.all([
            // page.waitForResponse(
            //     `http://127.0.0.1:8001/proxy/v3/datasets/${test_param["dataset_id"]}`
            // ),
            page.goto(`http://localhost:3000/datasets/${dataset_id}`),
        ]);

        const dataset_title_locator = await page.locator(
            "data-testid=dataset-title"
        );
        console.log(await dataset_title_locator.innerText());
        await expect(dataset_title_locator).toContainText(dataset_title);

        await page.pause();
    });
    // test(`Go to dataset details for: ${test_param["dataset_id"]}`, async () => {
    //     await Promise.all([
    //         // page.waitForResponse(
    //         //     `http://127.0.0.1:8001/proxy/v3/datasets/${test_param["dataset_id"]}`
    //         // ),
    //         page.goto(
    //             `http://localhost:3000/datasets/${test_param["dataset_id"]}`
    //         ),
    //     ]);

    //     await page.pause();
    // });
});
