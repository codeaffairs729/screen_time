import { test, expect, Page, Response } from "@playwright/test";

let page: Page;

const filterDatasetData = {
    R1: [] as string[], // list of all the titles on the first search
    R2: [] as string[], // list of all the titles on the second search
    R3: [] as string[], // list of all the titles on the third search
    FT1: [] as string[], // list of all the file type options available on the first search
    FT2: [] as string[], // list of all the file type options available on the second search
    FT: "",
};

/**
 * Get the list of all the filter texts
 */
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

/**
 * Return datasets from the search
 */
const getDatasetResults = async (
    response: Response
) => {
    const resp = await response.json();
    const results: { [key: string]: any }[] = resp[0].user_search[0].results;
    return results;
};


/**
 * Valid filter items are those filters which are not present in all of the results
 */
const getValidFilterItems = (results:{ [key: string]: any }[])=>{
    const filterItems: string[] = [];
    results.forEach((result: any) => {
        result.urls.forEach((url: any) => filterItems.push(url.format));
    });
    const validFilterItems: Set<string> = new Set();
    for (let filter of filterItems) {
        if (!filter || validFilterItems.has(filter)) {
            continue;
        }
        const filteredResultCount = results.filter((result: any) =>
            result.urls.map((url: any) => url.format).includes(filter)
        ).length;
        if (filteredResultCount != results.length) {
            validFilterItems.add(filter);
        }
    }
    return validFilterItems;
}

const getValidFilterCheckbox = (validFilterItems: Set<string>) => {
    let validFilterCheckbox;
    for (let filter of filterDatasetData.FT1) {
        if (validFilterItems.has(filter)) {
            validFilterCheckbox = page.locator('[data-selector="file-type"]', {
                hasText: filter,
            });
            break;
        }
    }
    return validFilterCheckbox;
};

test.describe("Filter dataset by file type", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test("Search and filter by file type", async () => {
        // Navigate to the search home page and search
        await page.goto(`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/`);
        await page.locator(".dataset-search-input input").click();
        await page.locator(".dataset-search-input input").fill("covid");
        let validFilterItems: Set<string> = new Set();
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*datasets.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const results = await getDatasetResults(response);
                    validFilterItems = getValidFilterItems(results);
                    filterDatasetData.R1 = (results as any).map((result: any) => result["id"]);;
                }
                return isValid;
            }),
            // EXPECTATION: user is taken to the Results List view
            page.waitForNavigation({
                url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/search?q=covid`,
            }),
            page.locator(".dataset-search-input input").press("Enter"),
        ]);

        // EXPECTATION: there are 20 results listed
        expect(filterDatasetData.R1.length == 20).toBe(true);
        // Record filters
        filterDatasetData.FT1 = await getFilters();

        let validFilterCheckbox;
        const newValidFilterCheckbox = getValidFilterCheckbox(validFilterItems);
        if (newValidFilterCheckbox) {
            validFilterCheckbox = newValidFilterCheckbox;
        }
        if (!validFilterCheckbox) {
            return; // Cancel rest of the test if all the results contain all the filters
        }
        filterDatasetData.FT = await validFilterCheckbox
            .locator("span")
            .innerText();

        // Check filter
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*datasets.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const results = await getDatasetResults(response);
                    // const results = res[1] as any;
                    filterDatasetData.R2 = results
                        .filter((result: any) =>
                            result.urls
                                .map((url: any) => url.format)
                                .includes(filterDatasetData.FT)
                        )
                        .map((result: any) => result["id"]);
                }
                return isValid;
            }),
            validFilterCheckbox.locator("input").check(),
        ]);

        const selectedFilter = page
            .locator('[data-selector="file-type"] :checked')
            .first();
        // EXPECTATION: the file type T is ticked in the options list
        expect(selectedFilter.isChecked()).toBeTruthy();

        // Record filters
        filterDatasetData.FT2 = await getFilters();
        // EXPECTATION: FT2 is the same as FT1 (the options shouldn't change)
        expect(
            JSON.stringify(filterDatasetData.FT1) ==
                JSON.stringify(filterDatasetData.FT2)
        ).toBe(true);

        // EXPECTATION: R2 != R1 (a filtering operation has occurred)
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R2)
        ).toBe(false);
        // EXPECTATION: C = 20 (the filter is appropriate)
        expect(filterDatasetData.R2.length == 20).toBe(true);

        let currentSelectedFilter = page.locator(
            '[data-selector="file-type"] input:checked'
        );
        
        // Uncheck filter
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*datasets.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const results = await getDatasetResults(response);
                    filterDatasetData.R3 = (results as any).map((result: any) => result["id"]);
                }
                return isValid;
            }),
            currentSelectedFilter.uncheck(),
        ]);

        // await page.pause();
        currentSelectedFilter = page.locator(
            '[data-selector="file-type"] input:checked'
        );
        // EXPECTATION: the file type T becomes not ticked in the options list
        await expect(currentSelectedFilter).toHaveCount(0);

        // Record new set of search results

        // EXPECTATION: R3 == R1 (the filter operation has been successfully reversed)
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R3)
        ).toBe(true);
        console.log(filterDatasetData);
        await page.pause();
    });
});
