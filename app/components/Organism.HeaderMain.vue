<template>
  <header
    class="header w-full flex justify-between items-center z-10"
    :class="{ 'border-b dark:border-b-gray-800': !atTop }"
  >
    <!-- logo -->
    <NuxtLink to="/">
      <img
        src="/logo.svg"
        alt="Meu Espresso Logo"
        class="w-8"
      >
    </NuxtLink>

    <!-- nav -->
    <nav class="flex gap-6">
      <NuxtLink
        v-for="{ path, label, icon } in appStore.nav"
        :key="path"
        :class="{
          'text-default-500': isActive({ path, label, icon }),
        }"
        :to="path"
      >
        <i :class="icon" />
        {{ label }}
      </NuxtLink>
    </nav>

    <!-- cart -->
    <NuxtLink
      to="/cart"
      class="w-10 h-10 flex justify-center items-center relative cursor-pointer rounded-full"
      :class="{ 'bg-gray-100 dark:bg-gray-800': cartIsActive }"
    >
      <div
        v-if="userStore.getCartSize"
        class="notification bg-default-600 font-bold text-xs"
      >
        {{ userStore.getCartSize }}
      </div>
      <i class="bi-cart2 text-lg" />
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
import { ITab } from "../types";

// store
const appStore = useAppStore();
const userStore = useUserStore();

// computed
const isActive = computed<Function>(() => ({ path }: ITab) => {
  return useRoute().path === path;
});
const cartIsActive = computed<boolean>(() => {
  return useRoute().path === "/cart";
});

// data
const atTop = ref<boolean>(true);

// methods
if (process.client) {
  window.addEventListener("scroll", () => {
    atTop.value = window.scrollY < 1;
  });
}
</script>

<style scoped>
.header {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
}
.dark .header {
  background: rgba(3, 7, 18, 0.7);
}
.notification {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  z-index: 2;
  transform: translate(10px, -10px);
}
</style>
