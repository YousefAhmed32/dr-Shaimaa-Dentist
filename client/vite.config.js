import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      host: "127.0.0.1",
      port: Number(env.VITE_PORT || 5173),
      strictPort: true,
      proxy: {
        "/api": { target: `http://127.0.0.1:${env.VITE_API_PORT || 5000}`, changeOrigin: true },
        "/uploads": { target: `http://127.0.0.1:${env.VITE_API_PORT || 5000}`, changeOrigin: true },
      },
    },
    preview: {
      host: "127.0.0.1",
      port: Number(env.VITE_PREVIEW_PORT || 4173),
      strictPort: true,
    },
    build: {
      target: "es2022",
      sourcemap: false,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: "react-core", test: /node_modules[\\/](?:react|react-dom|react-router|react-router-dom)[\\/]/, priority: 30 },
              { name: "motion", test: /node_modules[\\/](?:motion|framer-motion|motion-dom|motion-utils)[\\/]/, priority: 20 },
              { name: "interface", test: /node_modules[\\/](?:@radix-ui|lucide-react|lenis)[\\/]/, priority: 15 },
              { name: "vendor", test: /node_modules/, priority: 10 },
            ],
          },
        },
      },
    },
  };
});
