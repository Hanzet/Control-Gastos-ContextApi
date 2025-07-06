import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import MillionLint from "@million/lint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), [MillionLint.vite()]],
})
