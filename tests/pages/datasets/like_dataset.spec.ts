import { test, expect, Page } from "@playwright/test";
import sequelize from "../database";

const userData = {
    email: "johndoe@a.com",
    password: "pass",
    passwordHash:
        "$2b$12$O99PkKPPIR8DNiM832P8r.9pU7nXV.557D.hxP5ZevRQqBz9r.H2a",
};

const metaDatasetData = {
    id: 1365,
};
let user: any;

const beforeData = {
    likes: 0,
    dislikes: 0,
};
let page: Page;

/**
 * Delete user and the users likes from the db
 */
const deleteUser = async () => {
    await sequelize.query(
        `
        DELETE FROM meta_dataset_likes using users WHERE users.email ='${userData["email"]}' and users.id  = meta_dataset_likes.user_id;
        `
    );
    await sequelize.query(
        `
        DELETE FROM users WHERE email='johndoe@a.com';
        `
    );
};

test.describe("Like/Dislike dataset", () => {
    test.beforeAll(async ({ browser }) => {
        try {
            await deleteUser();
            await sequelize.query(
                `
                        INSERT INTO users (name, email, password, organisation, is_data_owner, role) 
                        VALUES ('John Doe', '${userData["email"]}', '${userData["passwordHash"]}', 'DTime', TRUE, 'developer');
                    `
            );
            page = await browser.newPage();
            console.log("DATABASE SETUP COMPLETED");
        } catch (error) {
            console.log("beforeAll error", error);
        }
    });
    test("Test Setup", async () => {
        await page.goto(
            `http://localhost:3000/datasets/${metaDatasetData["id"]}`
        );
        await page.locator('button:has-text("Feedback")').click();
        // Check the like count (call this L) and dislike count (call this D)
        beforeData["likes"] = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        beforeData["dislikes"] = Number(
            await page
                .locator("span[data-selector='dislike-count']")
                .innerText()
        );
        // EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
        await page.locator("button[data-selector='like-btn']").click();
        // EXPECTATION: Show message "Please login to continue"
        await expect(
            page.locator(
                ".dtechtive-toast-container div:has-text('please login to continue')"
            )
        ).toBeVisible();
    });
    test("Logged In User Like", async () => {
        // Login
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/login' }*/),
            page.locator("text=Log In").click(),
        ]);
        await page.locator('[placeholder="Email"]').fill(userData["email"]);
        await page.locator('[placeholder="Password"]').click();
        await page
            .locator('[placeholder="Password"]')
            .fill(userData["password"]);
        await Promise.all([
            page.waitForResponse((response) => response.status() == 200),
            //     `http://127.0.0.1:8000/proxy/v1/users/signin`
            // ),
            page.locator('button:has-text("Log In")').click(),
        ]);
        // Navigate to like button
        await page.goto(
            `http://localhost:3000/datasets/${metaDatasetData["id"]}`
        );
        await page.locator('button:has-text("Feedback")').click();
        // EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L
        const likes0 = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes0).toEqual(beforeData["likes"]);
        // EXPECTATION: "Dislike dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Dislike count is D
        const dislikes0 = Number(
            await page
                .locator("span[data-selector='dislike-count']")
                .innerText()
        );
        await expect(dislikes0).toEqual(beforeData["dislikes"]);
        // Click like
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/datasets/${metaDatasetData["id"]}/like`
            ),
            page.locator("button[data-selector='like-btn']").click(),
        ]);
        // EXPECTATION: "Like dataset" button is active
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_active']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L+1
        const likes1 = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes1).toEqual(beforeData["likes"] + 1);
        // EXPECTATION: "Dislike dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Dislike count is D
        const dislikes1 = Number(
            await page
                .locator("span[data-selector='dislike-count']")
                .innerText()
        );
        await expect(dislikes1).toEqual(beforeData["dislikes"]);
        // Remove like
        // await Promise.all([
        //     page.waitForResponse(
        //         `http://127.0.0.1:8000/proxy/v1/datasets/${metaDatasetData["id"]}/like`
        //     ),
        //     page.locator("button[data-selector='like-btn']").click(),
        // ]);
        // // EXPECTATION: "Like dataset" button is inactive
        // await expect(
        //     page.locator(
        //         "button[data-selector='like-btn'] img[data-selector='like_inactive']"
        //     )
        // ).toHaveCount(1);
        // // EXPECTATION: Like count is L
        // const likes2 = Number(
        //     await page.locator("span[data-selector='like-count']").innerText()
        // );
        // await expect(likes2).toEqual(beforeData["likes"]);
        // // EXPECTATION: "Dislike dataset" button is inactive
        // await expect(
        //     page.locator(
        //         "button[data-selector='dislike-btn'] img[data-selector='dislike_inactive']"
        //     )
        // ).toHaveCount(1);
        // // EXPECTATION: Dislike count is D
        // const dislikes2 = Number(
        //     await page
        //         .locator("span[data-selector='dislike-count']")
        //         .innerText()
        // );
        // await expect(dislikes2).toEqual(beforeData["dislikes"]);
    });
    test("With 'Like dataset' button active, click 'Dislike dataset' button", async () => {
        // await Promise.all([
        //     page.waitForResponse(
        //         "http://127.0.0.1:8000/proxy/v1/datasets/${metaDatasetData['id']}/like"
        //     ),
        //     page.locator("button[data-selector='like-btn']").click(),
        // ]);
        // Click Dislike button
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/datasets/${metaDatasetData["id"]}/dislike`
            ),
            page.locator("button[data-selector='dislike-btn']").click(),
        ]);
        // EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L
        const likes1 = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes1).toEqual(beforeData["likes"]);
        // EXPECTATION: "Dislike dataset" button is active
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_active']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Dislike count is D+1
        const dislikes1 = Number(
            await page
                .locator("span[data-selector='dislike-count']")
                .innerText()
        );
        await expect(dislikes1).toEqual(beforeData["dislikes"] + 1);
    });
    test("Click on 'Like dataset' button", async () => {
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/datasets/${metaDatasetData["id"]}/like`
            ),
            page.locator("button[data-selector='like-btn']").click(),
        ]);
        //  EXPECTATION: "Like dataset" button is active
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_active']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L+1
        const likes = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes).toEqual(beforeData["likes"] + 1);
        // EXPECTATION: "Dislike dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Dislike count is D
        const dislikes1 = Number(
            await page
                .locator("span[data-selector='dislike-count']")
                .innerText()
        );
        await expect(dislikes1).toEqual(beforeData["dislikes"]);
    });
    test("Click on 'Like dataset' button again", async () => {
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/datasets/${metaDatasetData["id"]}/like`
            ),
            page.locator("button[data-selector='like-btn']").click(),
        ]);
        //  EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L
        const likes = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes).toEqual(beforeData["likes"]);
        // EXPECTATION: "Dislike dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Dislike count is D
        const dislikes1 = Number(
            await page
                .locator("span[data-selector='dislike-count']")
                .innerText()
        );
        await expect(dislikes1).toEqual(beforeData["dislikes"]);
    });
    test("Toggle 'Dislike dataset' button", async () => {
        // Dislike Dataset
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/datasets/${metaDatasetData["id"]}/dislike`
            ),
            page.locator("button[data-selector='dislike-btn']").click(),
        ]);
        //  EXPECTATION: "Dislike dataset" button is active
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_active']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Dislike count is D+1
        const dislikes1 = Number(
            await page
                .locator("span[data-selector='dislike-count']")
                .innerText()
        );
        await expect(dislikes1).toEqual(beforeData["dislikes"] + 1);
        //  EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L
        const likes = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes).toEqual(beforeData["likes"]);
        // Remove Dislike Dataset
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/datasets/${metaDatasetData["id"]}/dislike`
            ),
            page.locator("button[data-selector='dislike-btn']").click(),
        ]);
        // EXPECTATION: "Dislike dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Dislike count is D
        const dislikes2 = Number(
            await page
                .locator("span[data-selector='dislike-count']")
                .innerText()
        );
        await expect(dislikes2).toEqual(beforeData["dislikes"]);
        //  EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L
        const likes1 = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes1).toEqual(beforeData["likes"]);
        await page.pause();
    });
    test.afterAll(async ({}) => {
        try {
            await deleteUser();
            console.log("DATABASE CLEANUP COMPLETED");
        } catch (error) {
            console.log("afterAll error", error);
        }
    });
});
