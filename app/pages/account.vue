<template>
  <section class="flex h-full justify-center md:pt-10">
    <!-- login -->
    <OrganismAccountLogin
      v-if="!userStore.isLogged"
      :loading="!!getOperation({ operation: EOperations.UserLogin })"
      :error="getError({ operation: EOperations.UserLogin })"
      @login="userStore.login"
      @removeError="removeError({ operation: EOperations.UserLogin })"
    />
    <!-- profile -->
    <OrganismAccountProfile
      v-if="userStore.user"
      :user="userStore.user"
      @logout="userStore.logout"
    />
    <!-- orders -->
    <OrganismAccountOrders />
  </section>
</template>

<script setup lang="ts">
import { EOperations } from "~/types";

// data
const { getOperation, getError, removeError } = useAppStore();
const userStore = useUserStore();
</script>

<style scoped></style>
