import { test, expect } from "@playwright/test";
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
};

const deleteUser = async () => {
    const [likeDeleteResults, likeDeleteMetadata] = await sequelize.query(
        `
        DELETE FROM meta_dataset_likes using users WHERE users.email ='johndoe@a.com' and users.id  = meta_dataset_likes.user_id;
        `
    );
    const [userDeleteResults, userDeleteMetadata] = await sequelize.query(
        `
        DELETE FROM users WHERE email='johndoe@a.com';
        `
    );
};

test.describe("Like dataset", () => {
    test.beforeAll(async ({}) => {
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
        } catch (error) {
            console.log("beforeAll error", error);
        }
    });
    test("Check likes without authentication", async ({ page }) => {
        await page.goto(`http://localhost:3000/datasets/1365`);
        await page.locator('button:has-text("Feedback")').click();
        beforeData['likes'] = Number(await page
            .locator("span[data-selector='like-count']")
            .innerText());
        // Login
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/login' }*/),
            page.locator("text=Log In").click(),
        ]);
        await page.locator('[placeholder="Email"]').fill("a@a.com");
        // Click [placeholder="Password"]
        await page.locator('[placeholder="Password"]').click();
        // Fill [placeholder="Password"]
        await page.locator('[placeholder="Password"]').fill("pass");
        // Click button:has-text("Log In")
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/),
            page.locator('button:has-text("Log In")').click(),
        ]);
        // Perform like after logging in
        await page.goto(`http://localhost:3000/datasets/1365`);
        await page.locator('button:has-text("Feedback")').click();
        await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse('http://127.0.0.1:8000/proxy/v1/datasets/1365/like'),
            // Triggers the response
            await page
            .locator("button[data-selector='like-count-btn']")
            .click()
          ]);
        const likes = Number(await page
            .locator("span[data-selector='like-count']")
            .innerText());
        expect(likes).toEqual(beforeData['likes']+1)
        await page.pause();
    });
    test.afterAll(async ({}) => {
        try {
            await deleteUser();
        } catch (error) {
            console.log("afterAll error", error);
        }
    });
});
