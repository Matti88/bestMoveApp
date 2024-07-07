import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import commonjs from '@rollup/plugin-commonjs';

const basenameProd = '/best-move'

export default defineConfig(({ command }) => {
  const isProd = command === 'build'

  return {
    base: isProd ? basenameProd : '',
    plugins: [react(), commonjs()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      commonjsOptions: {
        include: [/mapbox-gl/, /node_modules/]
      },
      rollupOptions: {
        external: ['mapbox-gl'],
        output: {
          globals: {
            'mapbox-gl': 'mapboxgl'
          }
        }
      }
  
    },
    define: {
      global: {
        basename: isProd ? basenameProd : '',
      },
    },
  }
})