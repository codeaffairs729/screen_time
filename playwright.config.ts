import { PlaywrightTestConfig, devices } from "@playwright/test";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config: PlaywrightTestConfig = {
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 3,
    use: {
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
    ],
};
export default config;