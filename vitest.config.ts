import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    env: {
      VITE_GATEWAY_API_URL: "http://localhost:9003/gateway",
    },
  },
});
