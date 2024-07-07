import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), commonjs()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/]
      },
      rollupOptions: {
        output: {
          globals: {
            'mapbox-gl': 'mapboxgl'
          }
        }
      }
    }
  }
})
