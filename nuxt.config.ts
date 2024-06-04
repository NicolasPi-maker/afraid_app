export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public : {
        appApiUrl: '',
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image",
    "nuxt-icon",
    "@vite-pwa/nuxt",
    "@nuxt/test-utils/module",
  ],
  pwa: {
    manifest: {
      name: "Get Afraid",
      short_name: "Get Afraid",
      description: "Une application pour vous faire peur !",
      lang: "fr",
      theme_color: "#000000",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: '192.svg',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '512.svg',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '512.svg',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
})