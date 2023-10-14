<template>
  <section
    v-if="userStore.user?.cart.length"
    class="flex flex-col items-center"
  >
    <div class="flex flex-col gap-6 w-full max-w-4xl">
      <!-- products -->
      <OrganismProductCartView
        :loading="
          appStore.getOperation({
            operation: EOperations.UserRemoveFromCart,
          })
        "
        :cart="userStore.user.cart"
        @remove="userStore.removeFromCart"
      />

      <!-- address -->
      <UAccordion
        class="border dark:border-gray-800 rounded-md pt-2"
        size="lg"
        variant="soft"
        color="black"
        :items="[{ label: 'Informações de Endereço', slot: 'address' }]"
        default-open
      >
        <template #address>
          <div class="px-3.5">
            <UForm
              :state="state"
              :validate="validate"
              class="gap-2 flex flex-col"
              @submit="getShipping"
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

              <UButton
                :loading="shippingLoading"
                type="submit"
                class="mt-2"
                color="black"
                size="lg"
                block
                trailing
              >
                Calcular Frete
              </UButton>
            </UForm>
          </div>
        </template>
      </UAccordion>

      <!-- receipt -->
      <UAccordion
        class="border dark:border-gray-800 rounded-md pt-2"
        size="lg"
        variant="soft"
        color="black"
        :items="[{ label: 'Resumo da Compra', slot: 'receipt' }]"
        default-open
      >
        <template #receipt>
          <div class="px-3.5 text-base">
            <!-- subtotal -->
            <p class="flex justify-between">
              <span class="opacity-50">Subtotal:</span>
              <span>{{ Real.format(getSubtotal) }}</span>
            </p>
            <!-- shipping -->
            <p class="flex justify-between">
              <span class="opacity-50">Frete:</span>
              <span>{{ Real.format(shipping) }}</span>
            </p>
            <!-- total -->
            <p class="flex justify-between">
              <span>Total:</span>
              <span class="text-green-500 font-bold">{{
                Real.format(getTotal)
              }}</span>
            </p>
          </div>
        </template>
      </UAccordion>

      <!-- buy -->
      <UButton
        size="lg"
        block
        :disabled="disabledBuy"
        :loading="appStore.getOperation({ operation: EOperations.UserBuy })"
        trailing
        @click="buy"
      >
        Finalizar Compra
      </UButton>
    </div>
  </section>
  <aside v-else>
    <!-- empty cart -->
    <UAlert
      color="amber"
      variant="soft"
      title="Seu carrinho está vazio"
      class="text-center"
    />
  </aside>
</template>

<script setup lang="ts">
import type { FormError } from "@nuxt/ui/dist/runtime/types";
import { EOperations } from "~/types";

// computed
const getSubtotal = computed<number>(() => {
  if (!userStore.user) return 0;

  let subtotal = 0;

  for (const { price, quantity } of userStore.user.cart) {
    subtotal += price * quantity;
  }

  return subtotal;
});
const getTotal = computed<number>(() => {
  return getSubtotal.value + shipping.value;
});

// data
const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const state = ref<any>({
  address: userStore.user?.address ?? "",
  addressNumber: userStore.user?.addressNumber ?? "",
  addressComplement: userStore.user?.addressComplement ?? "",
});
const shipping = ref<number>(25);
const shippingLoading = ref<boolean>(false);
const Real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const disabledBuy = ref<boolean>(false);

// methods
function validate(state: any): FormError[] {
  const errors = [];

  if (!state.address) {
    errors.push({ path: "address", message: "Campo inválido" });
  }
  if (!state.addressNumber) {
    errors.push({ path: "addressNumber", message: "Campo inválido" });
  }
  if (isNaN(Number(state.addressNumber))) {
    errors.push({ path: "addressNumber", message: "Campo inválido" });
  }

  disabledBuy.value = !!errors.length;

  return errors;
}
async function buy(): Promise<void> {
  await userStore.buy({
    address: state.value.address,
    addressNumber: state.value.addressNumber,
    addressComplement: state.value.addressComplement,
    shipping: shipping.value,
  });

  const error = appStore.getError({ operation: EOperations.UserBuy });

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
    title: "Compra realizada com sucesso!",
    icon: "i-heroicons-check-circle",
    description: "Verifique o andamento na aba Conta",
    color: "green",
    actions: [{ label: "Ver compra", click: () => router.push("/account") }],
  });
}

async function getShipping() {
  shippingLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  shippingLoading.value = false;
}

function redirectIfIsNotLogged(): void {
  if (!userStore.isLogged) {
    router.push("/account");
  }
}
redirectIfIsNotLogged();

// watch
watch(
  () => appStore.getError({ operation: EOperations.UserRemoveFromCart }),
  (error: string) => {
    if (!error) return;

    toast.add({
      title: error,
      icon: "i-heroicons-exclamation-triangle",
      description: "Por favor, tente novamente mais tarde",
      color: "red",
    });
  }
);
</script>

<style scoped></style>
