import { test, expect, Page } from "@playwright/test";
import sequelize from "tests/database";
import { deleteUser } from "tests/utils";

const userData = {
    name: "John Doe",
    email: "johndoe@a.com",
    password: "Password1!",
    passwordHash:
        "$2b$12$O99PkKPPIR8DNiM832P8r.9pU7nXV.557D.hxP5ZevRQqBz9r.H2a",
    confirmPassword: "Password1!",
    organisation: "dtime",
    dataOwner: "",
};

// Create a new user in db
const createUser = async () => {
    await sequelize.query(
        `
                INSERT INTO users (name, email, password, organisation, is_data_owner, role) 
                VALUES ('${userData["name"]}', '${userData["email"]}', '${userData["passwordHash"]}', '${userData["organisation"]}', FALSE, 'developer');
            `
    );
    console.log("done Create user");
};

const fillRegistrationPage = async (page: Page) => {
    await page.locator('[placeholder="Name"]').click();
    await page.locator('[placeholder="Name"]').fill(userData["name"]);
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(userData["email"]);
    await page.locator('[placeholder="Password"]').click();
    await page.locator('[placeholder="Password"]').fill(userData["password"]);
    await page.locator('[placeholder="Confirm Password"]').click();
    await page
        .locator('[placeholder="Confirm Password"]')
        .fill(userData["password"]);
    await page.locator('[placeholder="Organisation"]').click();
    await page
        .locator('[placeholder="Organisation"]')
        .fill(userData["organisation"]);
    await page.locator('[data-selector="data-owner-dropdown"] button').click();
    await page
        .locator('[data-selector="data-owner-dropdown"] span:has-text("No")')
        .click();
    await page.locator('[data-selector="role-dropdown"] button').click();
    await page
        .locator('[data-selector="role-dropdown"] span:has-text("Developer")')
        .click();
};

let page: Page;

test.describe("User registration", () => {
    test.beforeAll(async ({ browser }) => {
        try {
            await deleteUser(userData);
            page = await browser.newPage();
            console.log("DATABASE SETUP COMPLETED");
            // Navigate to login page (/signup)
            await page.goto(`http://localhost:3000/signup`);
        } catch (error) {
            console.log("beforeAll error", error);
        }
    });
    test("test for validation errors when submitting without filling the form", async () => {
        // Click on "Get started now" button before filling in the fields
        await page.locator('button[data-selector="signup-button"]').click();
        // EXPECTATION: See validation messages for respective fields
        await expect(page.locator("input[name='name'] + div")).toHaveText(
            "Name is required"
        );
        await expect(page.locator("input[name='email'] + div")).toHaveText(
            "Email is required"
        );
        await expect(page.locator("input[name='password'] + div")).toHaveText(
            "Password should be atleast of length 8."
        );
        await expect(
            page.locator("input[name='confirm_password'] + div")
        ).toHaveText("Confirm password is required");
        await expect(
            page.locator("input[name='organisation'] + div")
        ).toHaveText("Organisation is required");
        await expect(
            page.locator(
                "[data-selector='data-owner-dropdown'] div:nth-child(2)"
            )
        ).toHaveText("Data owner is required");
        await expect(
            page.locator("[data-selector='role-dropdown'] div:nth-child(2)")
        ).toHaveText("Role is required");
    });
    test("check for password validation errors", async () => {
        // Password should be atleast of length 8
        await page.locator('button[data-selector="signup-button"]').click();
        await expect(page.locator("input[name='password'] + div")).toHaveText(
            "Password should be atleast of length 8."
        );
        // Atleast one capital letter required
        await page.locator("input[name='password']").fill("password");
        await expect(page.locator("input[name='password'] + div")).toHaveText(
            "Password should contain atleast 1 uppercase character."
        );
        // Password should contain atleast 1 number
        await page.locator("input[name='password']").fill("Password");
        await expect(page.locator("input[name='password'] + div")).toHaveText(
            "Password should contain atleast 1 number."
        );
        // Password should contain atleast 1 special character
        await page.locator("input[name='password']").fill("Password1");
        await expect(page.locator("input[name='password'] + div")).toHaveText(
            "Password should contain atleast 1 special character."
        );
        // Valid password
        await page.locator("input[name='password']").fill("Password1!");
        await expect(page.locator("input[name='password'] + div")).toHaveCount(
            0
        );
    });
    test("validation for existing user", async () => {
        await fillRegistrationPage(page);
        await createUser();
        await Promise.all([
            page.waitForResponse(
                `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/signup`
            ),
            page.locator('button[data-selector="signup-button"]').click(),
        ]);
        // EXPECTATION: See error message "A user with this email already exists."
        await expect(
            page.locator(
                "[data-selector='error-alert']>div>div:has-text('A user with this email already exists.')"
            )
        ).toBeVisible();
        await deleteUser(userData);
    });
    test("fill form and register", async () => {
        // On successful registration user is logged in redirected to the home page
        await Promise.all([
            page.waitForNavigation({
                url: `${process.env.NEXT_PUBLIC_SENTIMENT_WEBCLIENT_ROOT}`,
            }),
            page.waitForResponse(
                `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/signup`
            ),
            page.locator('button[data-selector="signup-button"]').click(),
        ]);
        // EXPECTATION: Show message "You have successfully signed in"
        await expect(
            page.locator(
                ".dtechtive-toast-container div:has-text('You have successfully signed in')"
            )
        ).toBeVisible();
        await page.pause();
    });
});
