import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Vite configuration for the Finança Pessoal app.
// Sets the base URL to match the GitHub Pages repository name and registers
// the PWA plugin with a minimal manifest. This file uses TypeScript so that
// type errors will surface at build time.
export default defineConfig({
  // When deploying to GitHub Pages the site is served from a subdirectory.
  // The base option ensures that asset paths are resolved correctly.
  base: '/financa-pessoal/',
  plugins: [
    react(),
    // Configure the PWA plugin. It will generate the service worker and
    // inject the necessary scripts into the build. The manifest defines
    // how the application appears when installed on a device.
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Finança Pessoal',
        short_name: 'Finanças',
        start_url: '/financa-pessoal/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});