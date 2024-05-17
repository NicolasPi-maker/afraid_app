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
    "@vite-pwa/nuxt"
  ],
})