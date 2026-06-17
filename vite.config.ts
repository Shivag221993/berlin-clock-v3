import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/tests/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: "./setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
