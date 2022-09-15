import { test, expect, Page, Response } from "@playwright/test";

let page: Page;

const filterDatasetData = {
    R1: [] as string[], // list of all the titles on the first search
    R2: [] as string[], // list of all the titles on the second search
    // R3: [] as string[], // list of all the titles on the third search
    // T1: [] as string[], // list of all the topic options available on the first search
    // T2: [] as string[], // list of all the topic options available on the second search
    D: "", // Dataset title whose detailed page is opened
};

const performSearch = async (searchTerm: string) => {
    await page.goto(`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/`);
    await page.locator(".dataset-search-input input").click();
    await page.locator(".dataset-search-input input").fill(`${searchTerm}`);
    await Promise.all([
        page.waitForResponse(async (response: Response) => {
            const regex = new RegExp(".*datasets.*");
            const isValid =
                regex.test(response.url()) && response.status() === 200;
            // if (isValid) {
            //     const { results, filterOptions } = await getDatasetResults(
            //         response
            //     );
            //     filterDatasetData.T1 = filterOptions["topic"];
            //     validTopics = getValidTopics(
            //         results,
            //         filterOptions["topic"]
            //     );
            //     filterDatasetData.R1 = (results as any).map(
            //         (result: any) => result["id"]
            //     );
            // }
            return isValid;
        }),
        // EXPECTATION: user is taken to the Results List view
        page.waitForNavigation({
            url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/search?q=${searchTerm}`,
        }),
        page.locator(".dataset-search-input input").press("Enter"),
    ]);
};

test.describe("Search for dataset", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test("Search for covid", async () => {
        await performSearch("covid");
        await page.waitForSelector('[data-testid="search-item"]');
        // const resultsCount = await page.locator('[data-testid="search-item"]').count();
        // console.log("c", c);
        // await page.pause();
        filterDatasetData.R1 = await page
            .locator('[data-testid="search-item"] h3 a')
            .allInnerTexts();
    });
    test("Visit dataset detail page", async () => {
        const detailDataset = page
            .locator('[data-testid="search-item"] h3 a')
            .first();
        filterDatasetData.D = (await detailDataset.textContent()) as string;
        await Promise.all([page.waitForNavigation({}), detailDataset.click()]);
        const detailDatasetTitle = (await page
            .locator('[data-testid="dataset-title"]')
            .textContent()) as string;
        expect(detailDatasetTitle == filterDatasetData.D).toBe(true);
        // filterDatasetData.D =
        const backButton = await page.locator("text=Go back");
        await Promise.all([page.waitForNavigation({}), backButton.click()]);
        filterDatasetData.R2 = await page
            .locator('[data-testid="search-item"] h3 a')
            .allInnerTexts();
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R2)
        ).toBe(true);

        console.log("filterDatasetData", filterDatasetData);
    });
    test("Search for health", async () => {
        await performSearch("health");
        await page.waitForSelector('[data-testid="search-item"]');
        const resultsCount = await page.locator('[data-testid="search-item"]').count();
        expect(resultsCount).toBe(20);
    });
    test("Test data file download", async () => {
        await Promise.all([
            page.waitForNavigation({}),
            page.locator('[data-testid="search-item"] h3 a').first().click(),
        ]);
        const [download] = await Promise.all([
            // Start waiting for the download
            page.waitForEvent("download"),
            // Perform the action that initiates download
            page.locator('[data-testid="data-files"] a').first().click(),
        ]);
    });
    test("Test data host link", async ()=>{
        const dataHost = await page.locator('[data-testid="data-host"] a');
        // await Promise.all([page.waitForNavigation({}), dataHost.click()]);
        dataHost.click();
        await page.pause();
    });
});

// test.describe("Filter dataset by topic", () => {
//     test.beforeAll(async ({ browser }) => {
//         page = await browser.newPage();
//     });
//     test("Search and filter by topic", async () => {
//     });

// });
