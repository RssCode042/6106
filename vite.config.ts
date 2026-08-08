import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import Sitemap from 'vite-plugin-sitemap'
// @ts-ignore


// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(), 
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
    }),
    Sitemap({
      hostname: 'https://6106.bg',
      dynamicRoutes: [
        '/',
        '/services',
        '/contact',
        '/download-app'
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-helmet-async')) {
              return 'vendor'
            }
            if (id.includes('lucide-react') || id.includes('qrcode.react')) {
              return 'ui'
            }
            return 'modules'
          }
        }
      }
    }
  }
})
