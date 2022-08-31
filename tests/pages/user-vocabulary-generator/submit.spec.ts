import { test, expect, Page } from "@playwright/test";
import sequelize from "tests/database";

const { QueryTypes } = require("sequelize");

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
        DELETE FROM user_flagged_vocabulary WHERE user_id='johndoe@a.com';
        DELETE FROM user_vocabulary WHERE user_id='johndoe@a.com';
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
            page.waitForNavigation({
                url: "http://localhost:3000/user-vocabulary-generator",
            }),
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/user-vocabulary-generator/onload`
            ),
            page.locator("text=Domain Vocabulary Generator").click(),
        ]);
    });
    test("Part 1: Submission tests", async () => {
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
        // Before submission original old keyword
        const old_keyword = await page
            .locator("id=keyword-display")
            .textContent();
        // const domain_value = await page
        //     .locator('input[role="combobox"]')
        //     .inputValue();
        // const domain_value = await page
        //     .locator("input#headlessui-combobox-input-35")
        //     .innerText();
        // console.log(domain_value);
        // Fill input[name="synonym_1"]
        await page.locator('input[name="synonym_1"]').fill("asd");
        // Fill input[name="synonym_2"]
        await page.locator('input[name="synonym_2"]').fill("");
        // Fill input[name="synonym_3"]
        await page.locator('input[name="synonym_3"]').fill("");
        // Click button:has-text("Submit")
        await Promise.all([
            // TODO : get the current active domain from the frontend and pass it on to the url here
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/user-vocabulary-generator/add?domain=health`
            ),
            await page.locator('button:has-text("Submit")').click(),
        ]);
        const user_synonym = await sequelize.query(
            "SELECT * FROM user_vocabulary WHERE user_id='johndoe@a.com'",
            { type: QueryTypes.SELECT }
        );
        expect(user_synonym.length).toBeGreaterThanOrEqual(1);

        // After submission new keyword and old key word dont match
        const new_keyword = await page
            .locator("id=keyword-display")
            .textContent();
        expect(new_keyword).not.toEqual(old_keyword);
    });
    test("Part 2: ", async () => {
        // Test refresh to check change in keywords
        const keyword_1 = await page
            .locator("id=keyword-display")
            .textContent();
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/user-vocabulary-generator/onload`
            ),
            page.reload(),
        ]);
        const keyword_2 = await page
            .locator("id=keyword-display")
            .textContent();
        // After reload new keyword and old key word dont match
        expect(keyword_2).not.toEqual(keyword_1);

        // New keyword on clicking on the keyword
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/user-vocabulary-generator/random?domain=health`
            ),
            page.locator("id=keyword-display").click(),
        ]);
        const keyword_3 = await page
            .locator("id=keyword-display")
            .textContent();
        // After clicking on the keyword, the new keyword is random and not equal to the earlier one
        expect(keyword_3).not.toEqual(keyword_2);

        // Flagging keyword records the user, keyword, domain_name with a new keyword load
        await Promise.all([
            page.waitForResponse(
                `http://127.0.0.1:8000/proxy/v1/user-vocabulary-generator/flag?domain=health`
            ),
            page.locator('button:has-text("⚐")').click(),
        ]);
        const user_flags = await sequelize.query(
            "SELECT * FROM user_flagged_vocabulary WHERE user_id='johndoe@a.com'",
            { type: QueryTypes.SELECT }
        );
        expect(user_flags.length).toBeGreaterThanOrEqual(1);
        const keyword_4 = await page
            .locator("id=keyword-display")
            .textContent();
        // After flagging on the keyword, the new keyword is random and not equal to the earlier one
        expect(keyword_4).not.toEqual(keyword_3);
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
