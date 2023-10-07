<template>
  <nav
    class="flex w-full justify-evenly py-4 border-t dark:border-t-gray-800 bg-gray-100 dark:bg-gray-900"
  >
    <NuxtLink
      v-for="{ path, label, icon } in appStore.nav"
      :key="path"
      :to="path"
      class="text-center text-sm"
      :class="{
        'text-default-600': isActive({ path, label, icon }),
      }"
    >
      <i :class="icon" />
      <p>{{ label }}</p>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { ITab } from "../types";

// store
const appStore = useAppStore();

// computed
const isActive = computed<Function>(() => ({ path }: ITab) => {
  return useRoute().path === path;
});
</script>

<style scoped></style>
