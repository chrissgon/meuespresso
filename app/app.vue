<template>
  <div>
    <VitePwaManifest />
    <!-- header main -->
    <OrganismHeaderMain class="fixed top-0 py-3 sm:px-16 px-10" />
    <!-- pages -->
    <NuxtPage class="page-height px-5 sm:px-10 mt-20" />
    <!-- footer main -->
    <OrganismFooterMain class="px-5 sm:px-10 py-5 mt-10" />
    <!-- notifications -->
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import pkg from "./package.json";

const productStore = useProductStore();
productStore.getProducts();

if (process.client) {
  useSeoMeta({
    description: pkg.description,
    ogTitle: pkg.displayName,
    ogDescription: pkg.description,
    ogImage: "/thumb.png",
    ogUrl: location.origin,
    twitterTitle: pkg.displayName,
    twitterDescription: pkg.description,
    twitterImage: "/thumb.png",
    twitterCard: "summary_large_image",
  });
}

useHead({
  htmlAttrs: {
    lang: "pt-br",
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});
</script>

<style>
html,
body {
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  font-family: "Nunito Sans", sans-serif;
  scroll-behavior: smooth;
}

.lora {
  font-family: "Lora", serif;
}

.dark body {
  background-color: #030712;
  color: white;
}

.page-height {
  min-height: calc(100vh - 208px);
}
</style>
