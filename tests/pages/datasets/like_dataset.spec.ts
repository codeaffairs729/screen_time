import { test, expect, Page } from "@playwright/test";
import sequelize from "../database";

const userData = {
    email: "johndoe@a.com",
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

const deleteUser = async () => {
    await sequelize.query(
        `
        DELETE FROM meta_dataset_likes using users WHERE users.email ='johndoe@a.com' and users.id  = meta_dataset_likes.user_id;
        `
    );
    await sequelize.query(
        `
        DELETE FROM users WHERE email='johndoe@a.com';
        `
    );
};

test.describe("Like dataset", () => {
    test.beforeAll(async ({ browser }) => {
        try {
            await deleteUser();
            const [usersInsertResults, usersInsertMetadata] =
                await sequelize.query(
                    `
                        INSERT INTO users (name, email, password, organisation, is_data_owner, role) 
                        VALUES ('John Doe', '${userData["email"]}', 'pass', 'DTime', TRUE, 'developer');
                    `
                );
            const [userResult, userMetadata] = await sequelize.query(
                `
                    SELECT * FROM users WHERE email='${userData["email"]}';
                `
            );
            user = (userResult as any)[0];
            const [likeInsertResult, likeInsertMetadata] =
                await sequelize.query(
                    `
                        INSERT INTO meta_dataset_likes (is_like, user_id, meta_dataset_id) 
                        VALUES (TRUE, '${user["id"]}', '${metaDatasetData["id"]}');
                    `
                );
            page = await browser.newPage();
            console.log("DATABASE SETUP COMPLETED");
        } catch (error) {
            console.log("beforeAll error", error);
        }
    });
    test("Like dataset before login", async () => {
        await page.goto(`http://localhost:3000/datasets/1365`);
        await page.locator('button:has-text("Feedback")').click();
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
    test("Toggle like dataset after login", async () => {
        // Login
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/login' }*/),
            page.locator("text=Log In").click(),
        ]);
        // await page.goto(`http://localhost:3000/login`);
        await page.locator('[placeholder="Email"]').fill("a@a.com");
        await page.locator('[placeholder="Password"]').click();
        await page.locator('[placeholder="Password"]').fill("pass");
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/),
            page.locator('button:has-text("Log In")').click(),
        ]);
        // Like
        await page.goto(`http://localhost:3000/datasets/1365`);
        await page.locator('button:has-text("Feedback")').click();
        await Promise.all([
            page.waitForResponse(
                "http://127.0.0.1:8000/proxy/v1/datasets/1365/like"
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
        // Remove like
        await Promise.all([
            page.waitForResponse(
                "http://127.0.0.1:8000/proxy/v1/datasets/1365/like"
            ),
            page.locator("button[data-selector='like-btn']").click(),
        ]);
        // EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L
        const likes2 = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes2).toEqual(beforeData["likes"]);
    });
    // test("Click on 'Like dataset' button again so that like is removed", async () => {
    // });
    test("With 'Like dataset' button active, click 'Dislike dataset' button", async () => {
        await Promise.all([
            page.waitForResponse(
                "http://127.0.0.1:8000/proxy/v1/datasets/1365/like"
            ),
            page.locator("button[data-selector='like-btn']").click(),
        ]);
        await Promise.all([
            page.waitForResponse(
                "http://127.0.0.1:8000/proxy/v1/datasets/1365/dislike"
            ),
            page.locator("button[data-selector='dislike-btn']").click(),
        ]);
        // EXPECTATION: "Dislike dataset" button is active
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_active']"
            )
        ).toHaveCount(1);
        // EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
    });
    test("Click on 'Like dataset' button", async () => {
        await Promise.all([
            page.waitForResponse(
                "http://127.0.0.1:8000/proxy/v1/datasets/1365/like"
            ),
            page.locator("button[data-selector='like-btn']").click(),
        ]);
        //  EXPECTATION: "Like dataset" button is active
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_active']"
            )
        ).toHaveCount(1);
        // EXPECTATION: "Dislike dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L+1
        const likes = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes).toEqual(beforeData["likes"] + 1);
    });
    test("Click on 'Like dataset' button again", async () => {
        await Promise.all([
            page.waitForResponse(
                "http://127.0.0.1:8000/proxy/v1/datasets/1365/like"
            ),
            page.locator("button[data-selector='like-btn']").click(),
        ]);
        //  EXPECTATION: "Like dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='like-btn'] img[data-selector='like_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: "Dislike dataset" button is inactive
        await expect(
            page.locator(
                "button[data-selector='dislike-btn'] img[data-selector='dislike_inactive']"
            )
        ).toHaveCount(1);
        // EXPECTATION: Like count is L
        const likes = Number(
            await page.locator("span[data-selector='like-count']").innerText()
        );
        await expect(likes).toEqual(beforeData["likes"]);
    });
    test("Toggle 'Dislike dataset' button", async () => {
        // Dislike Dataset
        await Promise.all([
            page.waitForResponse(
                "http://127.0.0.1:8000/proxy/v1/datasets/1365/dislike"
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
        // Remove Dislike Dataset
        await Promise.all([
            page.waitForResponse(
                "http://127.0.0.1:8000/proxy/v1/datasets/1365/dislike"
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
