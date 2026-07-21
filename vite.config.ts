import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      // PNG → WebP with 85% quality (great quality/size balance)
      png: { quality: 85 },
      // JPEG → WebP
      jpeg: { quality: 85 },
      jpg: { quality: 85 },
      // Also generate WebP variants
      webp: { lossless: false, quality: 85, alphaQuality: 85 },
    }),
  ],
  build: {
    // Increase inline threshold: assets smaller than 4KB are inlined as base64
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Content-hash in filenames for cache busting
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
