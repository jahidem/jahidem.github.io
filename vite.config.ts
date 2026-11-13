import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// User/organization GitHub Pages site (jahidem.github.io) serves from root.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
