import { test, expect } from "@playwright/test";
import Login from "./login";
import ExpireNotification from "./expire_notification";
import ClearNotification from "./clear_notification";
import SearchAndDownload from "./search_and_download";
import CheckMenuNotification from "./check_menu_notification";
import AutoExpiryOfNotification from "./auto_expiry_of_notifications";
import UserFeedback from "./user_feedback";
import CheckWorkspaceNotification from "./check_workspace_notification";

test.describe("User journey", () => {
    let page: any;
    test.setTimeout(100000);
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
    });
    test.afterAll(async ({ browser }) => {
        browser.close;
    });

    test("login as register user", async () => {
        const login = new Login(page);
        await login.LogIn();
        await login.checkUser();
    });

    test("Expire All Notification", async () => {
        const expire_notification = new ExpireNotification(page);
        await expire_notification.NotificationExpire();
    });

    test("Clear All notification", async () => {
        const clear_notification = new ClearNotification(page);
        await clear_notification.NotificationClear();
    });

    test("PERFORM A SEARCH AND DOWNLOAD SOME FILES", async () => {
        const search_and_download = new SearchAndDownload(page);
        await search_and_download.SearchDownload();
    });
    test("Check menu Notification", async ()=>{
        const check_menu_notification = new CheckMenuNotification(page)
        await check_menu_notification.CheckMenu();
    })

    test("Check WorkSpace Notification",async () => {
        const check_workspace_notification = new CheckWorkspaceNotification(page)
        await check_workspace_notification.checkWorkspaceNotification();
    })

    test("Auto Expiry Of notification", async()=>{
        const auto_expiry_notification = new AutoExpiryOfNotification(page)
        await auto_expiry_notification.autoExpiryOfNotifications();
    })
    test("User Feedback",async () => {
        const user_feedback = new UserFeedback(page)
        await user_feedback.userFeedback();
    })
});
