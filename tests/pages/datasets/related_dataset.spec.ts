import { test, expect, Page } from "@playwright/test";

// npx playwright test tests/pages/datasets/related_dataset.spec.ts --project=chromium --headed

let page: Page;

const test_param = {
    search_query: "virus",
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
        await page.pause();
    });
});
