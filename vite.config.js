import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
plugins: [react()],
base: '/p192/', // http://localhost:5173/p192/
build: {
outDir: 'docs'
}
})