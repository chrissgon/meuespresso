import pkg from "./package.json";

const PROJECT = pkg.displayName;
const BASE_URL = "/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      title: "Meu Expresso",

      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Nunito+Sans:wght@400;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      SERVER_URL: process.env.SERVER_URL,
    },
  },

  // devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vite-pwa/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],

  imports: {
    dirs: ["store"],
  },

  tailwindcss: { viewer: false },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      id: BASE_URL,
      start_url: BASE_URL,
      name: PROJECT,
      short_name: PROJECT,
      theme_color: "#ffffff",
      icons: [
        {
          src: BASE_URL + "192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: BASE_URL + "512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    // devOptions: {
    //   enabled: true,
    //   type: "module",
    // },
  },
});
