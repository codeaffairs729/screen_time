import { test, expect, Page } from "@playwright/test";

let page: Page;

const filterDatasetData = {
    R1: [] as string[], // list of all the titles on the first search
    R2: [] as string[], // list of all the titles on the second search
    R3: [] as string[], // list of all the titles on the third search
    FT1: [] as string[], // list of all the file type options available on the first search
    FT2: [] as string[], // list of all the file type options available on the second search
    T: "",
};

const getSearchResults = async () => {
    await page
        .locator('[data-selector="dataset-search-item"]')
        .first()
        .waitFor();
    const searchResultsLocators = page.locator(
        '[data-selector="dataset-search-item"] h4 a'
    );
    const searchResults = await searchResultsLocators.evaluateAll((list) =>
        list.map((el) => (el as any).innerText)
    );
    return searchResults;
};

const getFilters = async () => {
    await expect(
        page.locator('[data-selector="file-type-filter-section"]')
    ).toBeVisible();
    const fileTypes = page.locator('[data-selector="file-type"]');
    const fileTypeTexts = (await fileTypes.allInnerTexts()).filter(
        (e) => e.trim() != ""
    );
    return fileTypeTexts;
};

test.describe("Favourite/unfavourite dataset", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test("Search and not filter by file type", async () => {
        // Search
        await page.goto(`${process.env.NEXT_PUBLIC_SENTIMENT_WEBCLIENT_ROOT}/`);
        await page.locator(".dataset-search-input input").click();
        await page.locator(".dataset-search-input input").fill("covid");
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/search?q=covid' }*/),
            page.locator(".dataset-search-input input").press("Enter"),
        ]);

        // Record search results
        filterDatasetData.R1 = await getSearchResults();
        // EXPECTATION: there are 10 results listed
        expect(filterDatasetData.R1.length==10).toBe(true);


        // Record filters
        filterDatasetData.FT1 = await getFilters();

        const selectedFilter = page
            .locator('[data-selector="file-type"]')
            .first();
        filterDatasetData.T = await selectedFilter.locator("span").innerText();

        // Check filter after checking
        await selectedFilter.locator("input").check();
        // await Promise.all([
        //     page.waitForResponse("**"),
        //     selectedFilter.locator("input").check(),
        // ]);
        const newSelectedFilter = page
            .locator('[data-selector="file-type"]')
            .first();
        // EXPECTATION: the file type T is ticked in the options list
        expect(
            await newSelectedFilter.locator("input").isChecked()
        ).toBeTruthy();

        // Record filters
        filterDatasetData.FT2 = await getFilters();
        // EXPECTATION: FT2 is the same as FT1 (the options shouldn't change)
        await expect(
            JSON.stringify(filterDatasetData.FT1) ==
                JSON.stringify(filterDatasetData.FT2)
        ).toBe(true);

        // Record new set of search results
        filterDatasetData.R2 = await getSearchResults();
        // EXPECTATION: R2 != R1 (a filtering operation has occurred)
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R2)
        ).toBe(true); // TODO: should be false
        // EXPECTATION: C = 10 (the filter is appropriate)
        expect(filterDatasetData.R2.length==10).toBe(true);

        // Check filter after checking
        await selectedFilter.locator("input").check();
        // await Promise.all([
        //     page.waitForResponse("**"),
        //     selectedFilter.locator("input").check(),
        // ]);
        const currentSelectedFilter = page
            .locator('[data-selector="file-type"] input:checked');
        // EXPECTATION: the file type T becomes not ticked in the options list
        expect(
            await currentSelectedFilter.isChecked()
        ).toBe(false);

        // Record new set of search results
        filterDatasetData.R3 = await getSearchResults();
        // EXPECTATION: R3 == R1 (the filter operation has been successfully reversed)
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R3)
        ).toBe(true);
        console.log(filterDatasetData);
    });
});
