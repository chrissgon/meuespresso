<template>
  <header class="w-full flex justify-between items-center">
    <!-- logo -->
    <img
      src="/logo.svg"
      alt="Meu Expresso Logo"
      class="w-8 sm:w-10"
    >

    <!-- nav -->
    <nav class="flex gap-12 max-md:hidden">
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
    <aside
      class="w-10 h-10 flex justify-center items-center relative cursor-pointer rounded-full"
      :class="{ 'bg-gray-100 dark:bg-gray-800': cartIsActive }"
      @click="$router.push('/cart')"
    >
      <div
        v-if="userStore.getCartSize"
        class="notification bg-default-600 font-bold text-sm"
      >
        {{ userStore.getCartSize }}
      </div>
      <i class="bi-cart2 text-xl" />
    </aside>
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
</script>

<style scoped>
.notification {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  z-index: 2;
  transform: translate(14px, -14px);
}
</style>
