import dotenv from 'dotenv';
import { defineConfig, devices } from "@playwright/test";

dotenv.config({ path: '.env.local' });

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5173",
    headless: false,
    launchOptions: {
      slowMo: 1000,
    },
    ...devices["Desktop Chrome"],
  },
});
