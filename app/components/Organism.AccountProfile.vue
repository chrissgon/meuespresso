<template>
  <article
    v-if="userStore.user"
    class="h-fit flex flex-col w-full max-w-[400px] text-center justify-center items-center rounded-lg md:border dark:border-gray-800 md:px-10 py-6"
  >
    <h4 class="lora text-xl font-bold">
      Meu Perfil
    </h4>

    <!-- mode -->
    <figure
      class="relative cursor-pointer"
      @click="isDark = !isDark"
    >
      <img
        src="/coffee-draw.svg"
        class="w-24 my-5"
        alt="Coffe Draw"
      >
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        variant="soft"
        class="absolute top-5 right-0"
        :ui="{ rounded: 'rounded-full' }"
      />
    </figure>

    <h1 class="text-lg font-bold">
      {{ userStore.user?.name }}
    </h1>
    <p class="text-sm text-gray-500">
      {{ userStore.user?.email }}
    </p>

    <!-- form -->

    <UForm
      :state="userStore.user"
      :validate="validate"
      class="mt-10 flex flex-col w-full gap-3"
      @submit="submit"
    >
      <!-- address -->
      <UFormGroup
        label="Endereço"
        name="address"
        required
      >
        <UInput
          v-model="userStore.user.address"
          size="lg"
        />
      </UFormGroup>
      <!-- address number -->
      <UFormGroup
        label="Número"
        name="addressNumber"
        required
      >
        <UInput
          v-model="userStore.user.addressNumber"
          size="lg"
        />
      </UFormGroup>
      <!-- address complement -->
      <UFormGroup
        label="Complemento"
        name="addressComplement"
      >
        <UInput
          v-model="userStore.user.addressComplement"
          size="lg"
        />
      </UFormGroup>
      <!-- password -->
      <UFormGroup
        label="Senha"
        name="password"
        required
      >
        <UInput
          v-model="userStore.user.password"
          type="password"
          size="lg"
        />
      </UFormGroup>
      <!-- check password -->
      <UFormGroup
        label="Confirmar Senha"
        name="checkPassword"
        required
      >
        <UInput
          v-model="checkPassword"
          type="password"
          size="lg"
        />
      </UFormGroup>

      <UButton
        type="submit"
        class="mt-2"
        size="lg"
        block
      >
        Salvar Dados
      </UButton>
    </UForm>
    <UButton
      size="lg"
      variant="outline"
      color="red"
      class="mt-5"
      block
      @click="userStore.logout"
    >
      Sair da Conta
    </UButton>
  </article>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

// computed
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

// data
const userStore = useUserStore();
const colorMode = useColorMode();
const checkPassword = ref<string>("");

// methods
function validate(): FormError[] {
  const errors = [];

  if (!userStore.user?.address) {
    errors.push({ path: "address", message: "Campo inválido" });
  }
  if (isNaN(Number(userStore.user?.addressNumber))) {
    errors.push({ path: "addressNumber", message: "Campo inválido" });
  }
  if (!userStore.user?.password) {
    errors.push({ path: "password", message: "Campo inválido" });
  }
  if (userStore.user?.password !== checkPassword.value) {
    errors.push({ path: "checkPassword", message: "A senha não confere" });
  }

  return errors;
}

async function submit(event: FormSubmitEvent<any>) {
  console.log("submit", event.data);
}
</script>

<style scoped></style>
