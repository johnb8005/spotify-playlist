import { ProxyOptions } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// add proxy, optional
const proxy: { [l: string]: ProxyOptions } = {
  "^/api/.*": {
    target: "https://faq.nexys.io/api",
    changeOrigin: true,
    secure: false,
    rewrite: (path: string) => path.replace(/^\/api/, ""),
  },
};

// this the default/base configuration
const baseConfig = {
  plugins: [react()],
  test: {
    // ...
  },
  server: { proxy },
};

// https://vitejs.dev/config/
// conditional config: https://vitejs.dev/config/#conditional-config
export default defineConfig(({ mode }) => {
  // if  `mode===ghpages`: we add the path prefix to match the path prefix of gh pages
  if (mode === "ghpages") {
    return { ...baseConfig, base: "/boilerplate_vite/" };
  }

  if (mode === "deploy") {
    return { ...baseConfig };
  }

  return baseConfig;
});
