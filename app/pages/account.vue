<template>
  <section class="flex h-full max-lg:flex-wrap justify-center gap-4 md:pt-10">
    <!-- login -->
    <OrganismAccountLogin
      v-if="!userStore.isLogged"
      :loading="!!getOperation({ operation: EOperations.UserLogin })"
      :error="getError({ operation: EOperations.UserLogin })"
      @login="userStore.login"
      @remove-error="removeError({ operation: EOperations.UserLogin })"
    />
    <!-- profile -->
    <OrganismAccountProfile
      v-if="userStore.user"
      :user="userStore.user"
      :loading="getOperation({ operation: EOperations.UserUpdate })"
      @logout="userStore.logout"
      @update="updateUser"
    />
    <!-- orders -->
    <OrganismAccountOrdersView
      v-if="userStore.user"
      :user="userStore.user"
      class="w-min max-sm:w-full"
    />
  </section>
</template>

<script setup lang="ts">
import { EOperations } from "~/types";

// data
const { getOperation, getError, removeError } = useAppStore();
const userStore = useUserStore();
const toast = useToast();

// methods
async function updateUser(data: any): Promise<void> {
  await userStore.updateUser(data);

  const error = getError({ operation: EOperations.UserUpdate });

  if (error) {
    toast.add({
      title: error,
      icon: "i-heroicons-exclamation-triangle",
      description: "Por favor, tente novamente mais tarde",
      color: "red",
    });
    return;
  }

  toast.add({
    title: "Dados atualizados com sucesso!",
    icon: "i-heroicons-check-circle",
    color: "green",
  });
}
</script>

<style scoped></style>
