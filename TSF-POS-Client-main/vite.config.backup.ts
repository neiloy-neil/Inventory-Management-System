import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Handle the Babel plugin issues by providing fallbacks
          ['@babel/plugin-transform-async-generator-functions', {}],
        ],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'The Sisters Furniture POS System',
        short_name: 'Sisters Furniture',
        description: 'Point of Sale system for The Sisters Furniture',
        theme_color: '#4361ee',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'public/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '/',
        orientation: 'portrait-primary'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  // Add resolve configuration to handle the Babel dependency issues
  resolve: {
    alias: {
      // Ensure consistent versions of Babel dependencies
      '@babel/helper-remap-async-to-generator': '@babel/helper-remap-async-to-generator',
      '@babel/plugin-transform-async-generator-functions': '@babel/plugin-transform-async-generator-functions',
      '@babel/preset-env': '@babel/preset-env',
    }
  },
  // Add optimizeDeps to handle pre-bundling issues
  optimizeDeps: {
    include: [
      '@babel/helper-remap-async-to-generator',
      '@babel/plugin-transform-async-generator-functions',
      '@babel/preset-env',
      'date-fns'
    ]
  }
})