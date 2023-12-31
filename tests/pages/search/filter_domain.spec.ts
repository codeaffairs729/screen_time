import { test, expect, Page, Response } from "@playwright/test";

let page: Page;

const filterDatasetData = {
    R1: [] as string[], // list of all the datasets on the first search
    R2: [] as string[], // list of all the datasets on the second search
    R3: [] as string[], // list of all the datasets on the third search
    D1: [] as string[], // list of all the domain options available on the first search
    D2: [] as string[], // list of all the domain options available on the second search
    D: "", // Domain filter checkbox text
};

/**
 * Get the list of all the filter texts
 */
const getDomains = async () => {
    await expect(
        page.locator('[data-selector="domain-filter-section"]')
    ).toBeVisible();
    const domainTypes = page.locator('[data-selector="domain-filter"]');
    const domainTypeTexts = (await domainTypes.allInnerTexts()).filter(
        (e) => e.trim() != ""
    );
    return domainTypeTexts;
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
 * Valid domains are those domains which are not present in all of the results
 */
const getValidDomains = (
    results: { [key: string]: any }[],
    domains: string[] = []
) => {
    const validDomains: Set<string> = new Set();
    for (let domain of domains) {
        if (!domain || validDomains.has(domain)) {
            continue;
        }
        const filteredResultCount = results.filter(
            (result: any) =>
                // result.urls.map((url: any) => url.format).includes(domain)
                result["dataset"].domain == domain
        ).length;
        if (filteredResultCount != results.length) {
            validDomains.add(domain);
        }
    }
    // const filteredResultCount = results.filter((result: any) =>
    //         // result.urls.map((url: any) => url.format).includes(domain)
    //         domains.includes(result["dataset"].domain)
    //     ).length;
    return validDomains;
};

const getValidDomainCheckbox = (validDomains: Set<string>) => {
    let validDomainCheckbox;
    for (let filter of filterDatasetData.D1) {
        if (validDomains.has(filter)) {
            validDomainCheckbox = page.locator(
                '[data-selector="domain-filter"]',
                {
                    has: page.locator(`text="${filter}"`),
                }
            );
            break;
        }
    }
    return validDomainCheckbox;
};

test.describe("Filter dataset by domain", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test("Search and filter by domain", async () => {
        // Navigate to the search home page and search
        await page.goto(`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/`);
        await page.locator(".dataset-search-input input").click();
        await page.locator(".dataset-search-input input").fill("covid");
        let validDomains: Set<string> = new Set();
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*datasets.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const { results, filterOptions } = await getDatasetResults(
                        response
                    );
                    filterDatasetData.D1 = filterOptions["domain"];
                    validDomains = getValidDomains(
                        results,
                        filterOptions["domain"]
                    );
                    filterDatasetData.R1 = (results as any).map(
                        (result: any) => result["id"]
                    );
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
        let validDomainCheckbox;
        const newValidFilterCheckbox = getValidDomainCheckbox(validDomains);
        if (newValidFilterCheckbox) {
            validDomainCheckbox = newValidFilterCheckbox;
        }

        if (!validDomainCheckbox) {
            return; // Cancel rest of the test if all the results contain all the filters
        }
        filterDatasetData.D = await validDomainCheckbox
            .locator("span")
            .innerText();
        // Check filter
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*searchquery.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const { results, filterOptions } = await getDatasetResults(
                        response
                    );
                    filterDatasetData.R2 = results
                        .filter(
                            (result: any) =>
                                result["dataset"].domain.toLowerCase() ==
                                filterDatasetData.D.toLowerCase()
                        )
                        .map((result: any) => result["id"]);
                }
                return isValid;
            }),
            validDomainCheckbox.locator("input").check(),
        ]);

        const selectedFilter = page
            .locator('[data-selector="domain-filter"] :checked')
            .first();
        // EXPECTATION: the domain T is ticked in the options list
        expect(selectedFilter.isChecked()).toBeTruthy();

        // Record filters
        filterDatasetData.D2 = await getDomains();
        // EXPECTATION: D2 is the same as D1 (the options shouldn't change)
        expect(
            JSON.stringify(filterDatasetData.D1) ==
                JSON.stringify(filterDatasetData.D2)
        ).toBe(true);

        // EXPECTATION: R2 != R1 (a filtering operation has occurred)
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R2)
        ).toBe(false);
        // EXPECTATION: C = 20 (the filter is appropriate)
        expect(filterDatasetData.R2.length == 20).toBe(true);

        let currentSelectedFilter = page.locator(
            '[data-selector="domain-filter"] input:checked'
        );
        // Uncheck filter
        await Promise.all([
            page.waitForResponse(async (response: Response) => {
                const regex = new RegExp(".*datasets.*");
                const isValid =
                    regex.test(response.url()) && response.status() === 200;
                if (isValid) {
                    const { results } = await getDatasetResults(response);
                    filterDatasetData.R3 = (results as any).map(
                        (result: any) => result["id"]
                    );
                }
                return isValid;
            }),
            currentSelectedFilter.uncheck(),
        ]);

        currentSelectedFilter = page.locator(
            '[data-selector="domain-filter"] input:checked'
        );
        // EXPECTATION: the domain T becomes not ticked in the options list
        await expect(currentSelectedFilter).toHaveCount(0);
        // EXPECTATION: R3 == R1 (the filter operation has been successfully reversed)
        expect(
            JSON.stringify(filterDatasetData.R1) ==
                JSON.stringify(filterDatasetData.R3)
        ).toBe(true);
        console.log(filterDatasetData);
    });
});
