import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    deno(),
    react(),
    tailwindcss(),
  ],
  server: {
    host: "localhost",
    port: 3000,
  },
});
