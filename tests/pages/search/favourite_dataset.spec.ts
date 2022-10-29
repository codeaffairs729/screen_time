import { test, expect, Page } from "@playwright/test";
import sequelize from "tests/database";

const userData = {
    name: "John Doe",
    email: "johndoe_favourite_dataset@a.com",
    password: "Password1!",
    passwordHash:
        "$2b$12$hCFuhNBfoQ2uKX1GUHduaeXRJaFS04NS1.oclV8.DpsqWSM1RxTPK",
    confirmPassword: "Password1!",
    organisation: "dtime",
    dataOwner: "",
};

const metaDatasetData = {
    id: 1365,
    title: "Coronavirus - COVID-19 - Management Information",
};

const favDatasetData = {
    id: null as any,
    statisticsFavCount: 0,
    profileFavCount: 1,
};

let page: Page;

/**
 * Delete user and the users likes from the db
 */
const deleteUserAndFavourites = async () => {
    await sequelize.query(
        `
      DELETE FROM meta_dataset_favourites using users WHERE users.email ='${userData["email"]}' and users.id  = meta_dataset_favourites.user_id;
      `
    );
    await sequelize.query(
        `
      DELETE FROM users WHERE email='${userData["email"]}';
      `
    );
};

const loginUser = async () => {
    await page.goto(
        `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/login`
    );
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(userData.email);
    await page.locator('[placeholder="Password"]').click();
    await page.locator('[placeholder="Password"]').fill(userData.password);
    await Promise.all([
        page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/' }*/),
        page.locator('button:has-text("Log In")').click(),
    ]);
};

const logoutUser = async () => {
    await page
        .locator('button[data-selector="profile-dropdown-button"]')
        .click();
    await Promise.all([
        page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/' }*/),
        page.locator('button:has-text("Log Out")').click(),
    ]);
};

const searchForDataset = async () => {
    await Promise.all([
        page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/' }*/),
        page.locator('a:has-text("Home")').click(),
    ]);
    await page.locator(".dataset-search-input input").click();
    await page.locator(".dataset-search-input input").fill("covid");
    await Promise.all([
        page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/search?q=covid' }*/),
        page.locator(".dataset-search-input input").press("Enter"),
    ]);
};

const checkProfileFavourites = async (extraSteps: Function) => {
    await page
        .locator('button[data-selector="profile-dropdown-button"]')
        .click();
    await Promise.all([
        page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/profile' }*/),
        page.locator('a:has-text("My Account")').click(),
    ]);
    await extraSteps();
};

test.describe("Favourite/unfavourite dataset", () => {
    test.beforeAll(async ({ browser }) => {
        try {
            await deleteUserAndFavourites();
            await sequelize.query(
                `
                    INSERT INTO users (name, email, password, organisation, is_data_owner, role) 
                    VALUES ('${userData["name"]}', '${userData["email"]}', '${userData["passwordHash"]}', '${userData["organisation"]}', FALSE, 'developer');
                `
            );
            await sequelize.query(
                `
                    INSERT INTO meta_dataset_favourites (user_id, meta_dataset_id) VALUES ((SELECT id FROM users WHERE email='${userData["email"]}'), '${metaDatasetData["id"]}');
                `
            );
            page = await browser.newPage();
            console.log("DATABASE SETUP COMPLETED");
        } catch (error) {
            console.error("beforeAll error", error);
        }
    });
    test("Test initial state", async () => {
        await loginUser();
        await checkProfileFavourites(async () => {
            // EXPECTATION: Number of favourited datasets is 1
            await expect(
                page.locator("[data-selector='favourite-dataset']")
            ).toHaveCount(favDatasetData.profileFavCount);
            // EXPECTATION: Identity of favourites matches favourites defined in setup step
            await expect(
                page.locator("[data-selector='favourite-dataset'] h4 a")
            ).toHaveText(metaDatasetData["title"]);
        });
    });
    test("Favourite dataset", async () => {
        await searchForDataset();
        const datasetItem = await page
            .locator('[data-selector="dataset-search-item"]')
            .nth(0);
        favDatasetData["id"] = await datasetItem.getAttribute(
            "data-dataset-id"
        );
        await Promise.all([
            page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/<id>' }*/),
            datasetItem.locator("h4 a").click(),
        ]);
        await page.locator('button:has-text("Summary Statistics")').click();
        favDatasetData["statisticsFavCount"] = Number(
            await page
                .locator('[data-selector="statistics-fav-count"]')
                .innerText()
        );
        await Promise.all([
            page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/search?q=covid' }*/),
            page.locator('[data-selector="back-btn"]').click(),
        ]);
        console.log("statisticsFavCount", favDatasetData["statisticsFavCount"]);
    });
    test("Click on 'Fav dataset' button(favourite dataset)", async () => {
        await Promise.all([
            page.waitForResponse(
                `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/datasets/${favDatasetData["id"]}/favourite`
            ),
            page
                .locator(
                    `[data-dataset-id='${favDatasetData["id"]}'] button[data-selector='fav-btn']`
                )
                .click(),
        ]);
        // EXPECTATION: empty heart icon changes to filled heart icon
        await expect(
            page.locator(
                `[data-dataset-id='${favDatasetData["id"]}'] img[data-selector='fav_active']`
            )
        ).toHaveCount(1);
        await Promise.all([
            page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/<id>' }*/),
            page
                .locator(
                    `[data-selector="dataset-search-item"][data-dataset-id='${favDatasetData["id"]}']`
                )
                .nth(0)
                .locator("h4 a")
                .click(),
        ]);
        await page.locator('button:has-text("Summary Statistics")').click();
        const newFavCount = Number(
            await page
                .locator(`[data-selector="statistics-fav-count"]`)
                .innerText()
        );
        // EXPECTATION: new count is old fav count +1
        await expect(newFavCount).toEqual(
            favDatasetData["statisticsFavCount"] + 1
        );
    });
    test("Visit profile page and check favourites section", async () => {
        await logoutUser();
        await loginUser();
        await checkProfileFavourites(async () => {
            // EXPECTATION: Number of favourited datasets is +1
            await expect(
                page.locator("[data-selector='favourite-dataset']")
            ).toHaveCount(favDatasetData.profileFavCount + 1);
            // EXPECTATION: dataset D is in the favourites list
            await expect(
                page.locator(`[data-dataset-id="${favDatasetData.id}"]`)
            ).toHaveCount(1);
        });
    });
    test("Click on 'Fav dataset' button again(unfavourite dataset)", async () => {
        await searchForDataset();
        await Promise.all([
            page.waitForResponse(
                `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/datasets/${favDatasetData["id"]}/favourite`
            ),
            page
                .locator(
                    `[data-dataset-id='${favDatasetData["id"]}'] button[data-selector='fav-btn']`
                )
                .click(),
        ]);
        // EXPECTATION: filled heart icon changes to empty heart icon
        await expect(
            page.locator(
                `[data-dataset-id='${favDatasetData["id"]}'] img[data-selector='fav_inactive']`
            )
        ).toHaveCount(1);
        // EXPECTATION: dataset D disappears from favourites list
        await checkProfileFavourites(async () => {
            await expect(
                page.locator(`[data-dataset-id="${favDatasetData["id"]}"]`)
            ).toHaveCount(0);
        });
        await searchForDataset();
        await Promise.all([
            page.waitForNavigation(/*{ url: '${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/<id>' }*/),
            page
                .locator(
                    `[data-selector="dataset-search-item"][data-dataset-id='${favDatasetData["id"]}']`
                )
                .nth(0)
                .locator("h4 a")
                .click(),
        ]);
        await page.locator('button:has-text("Summary Statistics")').click();
        const newFavCount = Number(
            await page
                .locator(`[data-selector="statistics-fav-count"]`)
                .innerText()
        );
        // EXPECTATION: new count is old fav count
        await expect(newFavCount).toEqual(favDatasetData["statisticsFavCount"]);
    });
});
