<template>
  <form
    v-if="!userStore.isLogged"
    class="h-fit flex flex-col w-full max-w-[400px] justify-center items-center rounded-lg gap-4 md:border dark:border-gray-800 md:px-10 md:py-24 py-14"
  >
    <!-- draw -->
    <img
      src="/coffee-draw.svg"
      class="w-24 -mt-5"
      alt="Coffe Draw"
    >

    <!-- header -->
    <header class="text-center my-5">
      <h1 class="lora text-xl">
        <b>Bem vindo visitante!</b>
      </h1>
      <p class="text-sm">
        Insira seu email e senha
      </p>
    </header>

    <UAlert
      v-if="getError({ operation: EOperations.UserLogin })"
      icon="i-heroicons-x-circle"
      color="red"
      variant="outline"
      :title="getError({ operation: EOperations.UserLogin })"
    />

    <!-- form -->
    <UForm
      :state="state"
      :validate="validate"
      class="w-full flex flex-col gap-4"
      @submit="userStore.login(state)"
    >
      <!-- email -->
      <UFormGroup
        label="Email"
        name="email"
        class="w-full"
        required
      >
        <UInput
          v-model="state.email"
          placeholder="meuemail@gmail.com"
          size="lg"
        />
      </UFormGroup>
      <!-- password -->
      <UFormGroup
        label="Senha"
        name="password"
        class="w-full"
        required
      >
        <UInput
          v-model="state.password"
          type="password"
          size="lg"
        />
      </UFormGroup>

      <UButton
        :loading="getOperation({ operation: EOperations.UserLogin })"
        class="mt-5"
        size="lg"
        type="submit"
        block
      >
        Entrar
      </UButton>
    </UForm>
  </form>
</template>

<script setup lang="ts">
import { EOperations } from "~/types";
import type { FormError } from "@nuxt/ui/dist/runtime/types";

// data
const { getOperation, getError, removeError } = useAppStore();
const userStore = useUserStore();

const state = ref({
  email: "christopher@gmail.com",
  password: "123456",
});

// methods
function validate(): FormError[] {
  const errors = [];

  if (!state.value.email) {
    errors.push({ path: "email", message: "Campo obrigatório" });
  }
  if (!state.value.password) {
    errors.push({ path: "password", message: "Campo obrigatório" });
  }

  if (errors.length > 0) {
    removeError({ operation: EOperations.UserLogin });
  }

  return errors;
}
</script>

<style scoped></style>
