<template>
  <article
    
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

    <!-- info -->
    <h1 class="text-lg font-bold">
      {{ user?.name }}
    </h1>
    <p class="text-sm text-gray-500">
      {{ user?.email }}
    </p>

    <!-- form -->
    <UForm
      :state="state"
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
          v-model="state.address"
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
          v-model="state.addressNumber"
          size="lg"
        />
      </UFormGroup>

      <!-- address complement -->
      <UFormGroup
        label="Complemento"
        name="addressComplement"
      >
        <UInput
          v-model="state.addressComplement"
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
          v-model="state.password"
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

      <!-- update -->
      <UButton
        type="submit"
        class="mt-2"
        size="lg"
        block
      >
        Salvar Dados
      </UButton>
    </UForm>

    <!-- logout -->
    <UButton
      size="lg"
      variant="outline"
      color="red"
      class="mt-5"
      block
      @click="$emit('logout')"
    >
      Sair da Conta
    </UButton>
  </article>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { IUser } from "~/types";

// props
interface IProps{
  user: IUser
}
const props = defineProps<IProps>()

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
const colorMode = useColorMode();
const checkPassword = ref<string>("");
const state = ref<IUser>(props.user)

// methods
function validate(): FormError[] {
  const errors = [];

  if (!props.user.address) {
    errors.push({ path: "address", message: "Campo inválido" });
  }
  if (isNaN(Number(props.user.addressNumber))) {
    errors.push({ path: "addressNumber", message: "Campo inválido" });
  }
  if (!props.user.password) {
    errors.push({ path: "password", message: "Campo inválido" });
  }
  if (props.user.password !== checkPassword.value) {
    errors.push({ path: "checkPassword", message: "A senha não confere" });
  }

  return errors;
}

async function submit(event: FormSubmitEvent<any>) {
  console.log("submit", event.data);
}

// emits
defineEmits(["logout"])
</script>

<style scoped></style>
