import { test, expect, Page } from "@playwright/test";
import sequelize from "../database";

const userData = {
    email: "johndoe@a.com",
    password: "pass",
    passwordHash:
        "$2b$12$O99PkKPPIR8DNiM832P8r.9pU7nXV.557D.hxP5ZevRQqBz9r.H2a",
};

let page: Page;
/**
 * Delete user and the users likes from the db
 */
const deleteUser = async () => {
    await sequelize.query(
        `
        DELETE FROM users WHERE email='johndoe@a.com';
        `
    );
};

test.describe("Vocabulary Generator: Submit Keywords", () => {
    test.beforeAll(async ({ browser }) => {
        try {
            await deleteUser();
            await sequelize.query(
                `
                    INSERT INTO users (name, email, password, organisation, is_data_owner, role) 
                    VALUES ('John Doe', '${userData["email"]}', '${userData["passwordHash"]}', 'Test', TRUE, 'developer');
                `
            );
            page = await browser.newPage();
            console.log("DATABASE SETUP COMPLETED");
        } catch (error) {
            console.log("beforeAll error", error);
        }
    });
    test("Redirect without login", async () => {
        // Go to the user vocabulary generator
        await page.goto("http://localhost:3000/user-vocabulary-generator");

        // Await to be redirected ot the login
        await expect(page).toHaveURL("http://localhost:3000/login");
    });
    test("Login and navigate", async () => {
        // User login
        await page.goto("http://localhost:3000/login");
        // Fill [placeholder="Email"]
        await page.locator('[placeholder="Email"]').fill(userData["email"]);
        // Fill [placeholder="Password"]
        await page
            .locator('[placeholder="Password"]')
            .fill(userData["password"]);
        // Click button:has-text("Log In")
        await Promise.all([
            page.waitForResponse((response) => response.status() == 200),
            //     `http://127.0.0.1:8000/proxy/v1/users/signin`
            // ),
            page.locator('button:has-text("Log In")').click(),
        ]);

        // Click text=User contributions
        await page.locator("text=User contributions").click();
        // Click text=Domain Vocabulary Generator
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/user-vocabulary-generator' }*/),
            page.locator("text=Domain Vocabulary Generator").click(),
        ]);

        // Test empty submission
        // Fill input[name="synonym_1"]
        await page.locator('input[name="synonym_1"]').fill("");
        // Fill input[name="synonym_2"]
        await page.locator('input[name="synonym_2"]').fill("");
        // Fill input[name="synonym_3"]
        await page.locator('input[name="synonym_3"]').fill("");
        // Click button:has-text("Submit")
        await page.locator('button:has-text("Submit")').click();
        // Resolved using: https://github.com/microsoft/playwright/discussions/10821
        await expect(
            page.locator('input[name="synonym_1"] + div')
        ).toContainText("At least 1 synonym must be entered.");

        // Test illegal: number
        // Fill input[name="synonym_1"]
        await page.locator('input[name="synonym_1"]').fill("1");
        // Fill input[name="synonym_2"]
        await page.locator('input[name="synonym_2"]').fill("");
        // Fill input[name="synonym_3"]
        await page.locator('input[name="synonym_3"]').fill("");
        // Click button:has-text("Submit")
        await page.locator('button:has-text("Submit")').click();
        // Resolved using: https://github.com/microsoft/playwright/discussions/10821
        await expect(
            page.locator('input[name="synonym_1"] + div')
        ).toContainText("Contins illegal chatacters.");

        // Test illegal: #$
        // Fill input[name="synonym_1"]
        await page.locator('input[name="synonym_1"]').fill("#");
        // Fill input[name="synonym_2"]
        await page.locator('input[name="synonym_2"]').fill("");
        // Fill input[name="synonym_3"]
        await page.locator('input[name="synonym_3"]').fill("");
        // Click button:has-text("Submit")
        await page.locator('button:has-text("Submit")').click();
        // Resolved using: https://github.com/microsoft/playwright/discussions/10821
        await expect(
            page.locator('input[name="synonym_1"] + div')
        ).toContainText("Contins illegal chatacters.");

        // Test duplicates
        // Fill input[name="synonym_1"]
        await page.locator('input[name="synonym_1"]').fill("asd");
        // Fill input[name="synonym_2"]
        await page.locator('input[name="synonym_2"]').fill("asd");
        // Fill input[name="synonym_3"]
        await page.locator('input[name="synonym_3"]').fill("");
        // Click button:has-text("Submit")
        await page.locator('button:has-text("Submit")').click();
        await expect(
            page.locator('.dtechtive-toast-container div[role="status"]', {
                has: page.locator(
                    "text=Duplicates in synonym entries not allowed."
                ),
            })
        ).toHaveCount(1);

        // Test valid submission and key word change
        // // Before submission original old keyword
        // const old_keyword = await page
        //     .locator("id=keyword-display")
        //     .textContent();
        // // Fill input[name="synonym_1"]
        // await page.locator('input[name="synonym_1"]').fill("asd");
        // // Fill input[name="synonym_2"]
        // await page.locator('input[name="synonym_2"]').fill("");
        // // Fill input[name="synonym_3"]
        // await page.locator('input[name="synonym_3"]').fill("");
        // // Click button:has-text("Submit")
        // await Promise.all([
        //     page.waitForResponse(
        //         `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/user-vocabulary-generator/add?domain=technology`
        //     ),
        //     await page.locator('button:has-text("Submit")').click(),
        // ]);

        // // setTimeout(() => {
        // //     console.log();
        // // }, 5000);
        // // After submission new keyword
        // const new_keyword = await page
        //     .locator("id=keyword-display")
        //     .textContent();
        // console.log(new_keyword);
        // console.log(old_keyword);
        // // expect(new_keyword).not.toEqual(old_keyword);

        // await page.pause();
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
