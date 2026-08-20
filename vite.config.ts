import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import Sitemap from 'vite-plugin-sitemap'
import { VitePWA } from 'vite-plugin-pwa'

// @ts-ignore

export default defineConfig({
  base: '/',
  plugins: [
    react(), 
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 , lossless: true},
      avif: { quality: 70 },
      svg: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupNumericValues: false,
            cleanupIds: {
              minify: false,
              remove: false,
            },
            convertPathData: false,
          },
        },
      },
      'sortAttrs',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
        },
      },
    ],
  },
    }),
    Sitemap({
      hostname: 'https://6106.bg',
      dynamicRoutes: [
        '/',
        '/services',
        '/contact',
        '/download-app',
        '/application',
        '/privacy',
        '/terms'
      ]
    }),
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
    },
    // Добавени оптимизации
    minify: 'esbuild',
    sourcemap: process.env.NODE_ENV === 'development' ? true : false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    // Компресия не е поддържана в текущия тип Vite build options.
  },
  
  // Добавени оптимизации за production
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-helmet-async',
      'react-fast-compare',
      'lucide-react',
      'qrcode.react'
    ],
  },
  
  // CSS оптимизации
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})