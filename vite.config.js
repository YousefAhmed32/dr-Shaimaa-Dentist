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
    },
    preview: {
      host: "127.0.0.1",
      port: Number(env.VITE_PREVIEW_PORT || 4173),
      strictPort: true,
    },
    build: {
      target: "es2022",
      sourcemap: false,
    },
  };
});
