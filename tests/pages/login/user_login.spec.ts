import { test, expect, Page } from "@playwright/test";
import { createUser, deleteUser } from "tests/utils";

const userData = {
    name: "John Doe",
    email: "johndoe@a.com",
    password: "Password1!",
    passwordHash:
        "$2b$12$fDCgxCUe6xOUusk1UHyP.OMrFyTv26RoX9Dy/wowl3/rkWZoEWzfq",
    confirmPassword: "Password1!",
    organisation: "dtime",
    dataOwner: "",
};

const fillLoginPage = async (page: Page, data: any) => {
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(data["email"]);
    await page.locator('[placeholder="Password"]').click();
    await page.locator('[placeholder="Password"]').fill(data["password"]);
};

let page: Page;

test.describe("User login", () => {
    test.beforeAll(async ({ browser }) => {
        try {
            await deleteUser(userData);
            await createUser(userData);
            page = await browser.newPage();
            console.log("DATABASE SETUP COMPLETED");
            
        } catch (error) {
            console.log("beforeAll error", error);
        }
    });
    test("test for validation errors when submitting without filling the form", async () => {
        // Navigate to login page (/login)
        await page.goto(`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/login`);
        // Click on "Get started now" button before filling in the fields
        await page.locator('button[data-selector="signin-button"]').click();
        // EXPECTATION: See validation messages for respective fields
        await expect(page.locator("input[name='email'] + div")).toHaveText(
            "Email is required"
        );
        await expect(page.locator("input[name='password'] + div")).toHaveText(
            "Password is required"
        );
    });
    test("test for validation error when wrong credentials are entered", async () => {
        await fillLoginPage(page, {
            email: "randomemail@xyz.com",
            password: "randomPass1!",
        });
        // Click on "Log in" button before filling in the fields
        await page.locator('button[data-selector="signin-button"]').click();
        // EXPECTATION: See validation messages for wrong user credentials
        await expect(
            page.locator(
                "[data-selector='error-alert']>div>div:has-text('Email/password you entered is wrong')"
            )
        ).toBeVisible();
    });
    test("fill form and login", async () => {
        await fillLoginPage(page, userData);
        // On successful login user is redirected to the home page
        await Promise.all([
            page.waitForNavigation({
                url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}`,
            }),
            page.waitForResponse(
                `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/signin`
            ),
            page.locator('button[data-selector="signin-button"]').click(),
        ]);
        // EXPECTATION: Show message "You have successfully signed in"
        await expect(
            page.locator(
                ".dtechtive-toast-container div:has-text('You have successfully signed in')"
            )
        ).toBeVisible();
    });
    test("logout user", async () => {
        await page
            .locator('button[data-selector="profile-dropdown-button"]')
            .click();
        await Promise.all([
            page.waitForNavigation({
                url: `${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/login`,
            }),
            page.locator('button:has-text("Log Out")').click(),
        ]);
        await deleteUser(userData);
    });
});
