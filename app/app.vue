<template>
  <div>
    <VitePwaManifest />
    <OrganismHeaderMain class="pt-6 sm:pt-8 sm:px-16 px-10" />
    <NuxtPage class="page-height px-5 sm:px-10 mt-5 sm:mt-10" />
    <OrganismFooterMain class="px-5 sm:px-10 py-5 mt-10 max-md:mb-[73px]" />
  </div>
</template>

<script setup lang="ts">
const productStore = useProductStore();
productStore.getProducts();
</script>

<style>
html,
body {
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  font-family: "Nunito Sans", sans-serif;
}

.lora {
  font-family: "Lora", serif;
}

.dark body {
  background-color: #030712;
  color: white;
}

.page-height {
  min-height: calc(100vh - 240px);
}
</style>
