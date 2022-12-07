import { PlaywrightTestConfig, devices } from "@playwright/test";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config: PlaywrightTestConfig = {
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 2,
    testMatch: ["tests/user_journey/index.test.ts"],
    use: {
        trace: "on-first-retry",
        headless: true,
    },
};
export default config;
