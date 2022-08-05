import { test, expect, Page, Response } from "@playwright/test";

let page: Page;

const filterDatasetData = {
    R1: [] as string[], // list of all the titles on the first search
    R2: [] as string[], // list of all the titles on the second search
    R3: [] as string[], // list of all the titles on the third search
    T1: [] as string[], // list of all the topic options available on the first search
    T2: [] as string[], // list of all the topic options available on the second search
    T: "",
};

/**
 * Get the list of all the filter texts
 */
const getTopics = async () => {
    await expect(
        page.locator('[data-selector="topic-filter-section"]')
    ).toBeVisible();
    const fileTypes = page.locator('[data-selector="topic-filter"]');
    const fileTypeTexts = (await fileTypes.allInnerTexts()).filter(
        (e) => e.trim() != ""
    );
    return fileTypeTexts;
};

/**
 * Return datasets from the search
 */
const getDatasetResults = async (response: Response) => {
    const resp = await response.json();
    const results: { [key: string]: any }[] = resp[0].user_search[0].results;
    const filter_options = resp[0].user_search[0].filter_options;
    return { filterOptions: filter_options, results };
};

/**
 * Valid topics are those topics which are not present in all of the results
 */
const getValidTopics = (
    results: { [key: string]: any }[],
    topics: string[] = []
) => {
    // const topics: string[] = [];
    // results.forEach((result: any) => {
    //     result.urls.forEach((url: any) => topics.push(url.format));
    // });
    const validTopics: Set<string> = new Set();
    for (let topic of topics) {
        if (!topic || validTopics.has(topic)) {
            continue;
        }
        const filteredResultCount = results.filter((result: any) =>
            result.urls.map((url: any) => url.format).includes(topic)
        ).length;
        if (filteredResultCount != results.length) {
            validTopics.add(topic);
        }
    }
    return validTopics;
};

const getValidTopicCheckbox = (validTopics: Set<string>) => {
    let validTopicCheckbox;
    for (let filter of filterDatasetData.T1) {
        if (validTopics.has(filter)) {
            validTopicCheckbox = page.locator(
                '[data-selector="topic-filter"]',
                {
                    has: page.locator(`text="${filter}"`),
                }
            );
            break;
        }
    }
    return validTopicCheckbox;
};

test.describe("Filter dataset by topic", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test("Search and filter by topic", async () => {
        // Navigate to the search home page and search
        await page.goto(`${process.env.NEXT_PUBLIC_SENTIMENT_WEBCLIENT_ROOT}/`);
        await page.locator(".dataset-search-input input").click();
        await page.locator(".dataset-search-input input").fill("covid");
        let validTopics: Set<string> = new Set();
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*datasets.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const { results, filterOptions } = await getDatasetResults(
                        response
                    );
                    filterDatasetData.T1 = filterOptions["topic"];
                    validTopics = getValidTopics(
                        results,
                        filterOptions["topic"]
                    );
                    filterDatasetData.R1 = (results as any).map(
                        (result: any) => result["id"]
                    );
                }
                return isValid;
            }),
            // EXPECTATION: user is taken to the Results List view
            page.waitForNavigation({
                url: `${process.env.NEXT_PUBLIC_SENTIMENT_WEBCLIENT_ROOT}/search?q=covid`,
            }),
            page.locator(".dataset-search-input input").press("Enter"),
        ]);
        // EXPECTATION: there are 20 results listed
        expect(filterDatasetData.R1.length == 20).toBe(true);
        let validTopicCheckbox;
        const newValidFilterCheckbox = getValidTopicCheckbox(validTopics);
        if (newValidFilterCheckbox) {
            validTopicCheckbox = newValidFilterCheckbox;
        }

        if (!validTopicCheckbox) {
            return; // Cancel rest of the test if all the results contain all the filters
        }
        filterDatasetData.T = await validTopicCheckbox
            .locator("span")
            .innerText();

        // Check filter
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*datasets.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const { results, filterOptions } = await getDatasetResults(
                        response
                    );
                    // const results = res[1] as any;
                    filterDatasetData.R2 = results
                        .filter((result: any) =>
                            JSON.parse(
                                result["dataset"].topics.replace(/'/g, '"')
                            ).includes(filterDatasetData.T)
                        )
                        .map((result: any) => result["id"]);
                }
                return isValid;
            }),
            validTopicCheckbox.locator("input").check(),
        ]);

        const selectedFilter = page
            .locator('[data-selector="topic-filter"] :checked')
            .first();
        // EXPECTATION: the topic T is ticked in the options list
        expect(selectedFilter.isChecked()).toBeTruthy();

        // Record filters
        filterDatasetData.T2 = await getTopics();
        // EXPECTATION: T2 is the same as T1 (the options shouldn't change)
        expect(
            JSON.stringify(filterDatasetData.T1) ==
                JSON.stringify(filterDatasetData.T2)
        ).toBe(true);

        // EXPECTATION: R2 != R1 (a filtering operation has occurred)
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R2)
        ).toBe(false);
        // EXPECTATION: C = 20 (the filter is appropriate)
        expect(filterDatasetData.R2.length == 20).toBe(true);

        let currentSelectedFilter = page.locator(
            '[data-selector="topic-filter"] input:checked'
        );
        // Uncheck filter
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*datasets.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const {results} = await getDatasetResults(response);
                    filterDatasetData.R3 = (results as any).map(
                        (result: any) => result["id"]
                    );
                }
                return isValid;
            }),
            currentSelectedFilter.uncheck(),
        ]);

        currentSelectedFilter = page.locator(
            '[data-selector="topic-filter"] input:checked'
        );
        // EXPECTATION: the topic T becomes not ticked in the options list
        await expect(currentSelectedFilter).toHaveCount(0);
        // EXPECTATION: R3 == R1 (the filter operation has been successfully reversed)
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R3)
        ).toBe(true);
        console.log(filterDatasetData);
        await page.pause();
    });
});
