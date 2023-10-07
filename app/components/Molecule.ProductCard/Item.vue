<template>
  <div
    class="border dark:border-gray-800 px-10 py-10 h-fit max-sm:min-w-full sm:min-w-[350px] lg:max-w-[24rem] rounded-lg"
  >
    <!-- image -->
    <figure class="h-36 flex items-center justify-center">
      <img
        :src="product.image"
        :alt="product.name"
        class="max-w-none w-[120%] -mt-10"
      >
    </figure>

    <!-- info -->
    <div class="text-center">
      <h4 class="lora text-lg font-bold">
        {{ product.name }}
      </h4>
      <p class="line-clamp-2 mt-2">
        {{ product.description }}
      </p>
    </div>

    <!-- price -->
    <div class="flex justify-between items-center max-sm:flex-col">
      <p class="text-green-500 my-5 font-bold text-xl">
        {{ Real.format(product.price) }}
      </p>

      <!-- quantity -->
      <div class="flex items-center gap-3">
        <UButton
          variant="solid"
          color="gray"
          icon="i-heroicons-minus"
          :disabled="disableDelButton"
          @click="delQuantity"
        />
        <span>{{ quantity }}</span>
        <UButton
          variant="solid"
          color="gray"
          icon="i-heroicons-plus"
          :disabled="disableAddButton"
          @click="addQuantity"
        />
      </div>
    </div>

    <!-- action -->
    <UButton
      class="max-sm:mt-5"
      size="lg"
      block
      :loading="loading"
      trailing
      @click="addToCart"
    >
      Adicionar ao Carrinho
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from "~/types";

// props
interface IProps {
  product: IProduct;
  loading?: boolean
}
const props = defineProps<IProps>();

// computed
const disableDelButton = computed<boolean>(() => {
  return quantity.value === 1;
});
const disableAddButton = computed<boolean>(() => {
  return quantity.value === props.product.quantity;
});

// data
const Real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const quantity = ref<number>(1);

// methods
function addQuantity(): void {
  quantity.value = quantity.value + 1;
}
function delQuantity(): void {
  quantity.value = quantity.value - 1;
}
function addToCart(): void {
  emit("addToCart", { ...props.product, quantity: quantity.value });
}

// emits
interface IEmits {
  (e: "addToCart", product: IProduct): void;
}
const emit = defineEmits<IEmits>();
</script>

<style scoped></style>
