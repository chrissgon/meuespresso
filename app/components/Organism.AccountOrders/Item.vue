<template>
  <div
    class="rounded-md w-full sm:max-w-[350px] border dark:border-gray-800 p-6"
  >
    <div class="pointer-events-none">
      <UButton
        v-if="order.deliveredAt"
        color="green"
      >
        Entregue
      </UButton>
      <UButton v-else>
        Andamento
      </UButton>
    </div>

    <!-- image -->
    <figure class="h-24 flex items-center justify-center">
      <img
        :src="order.image"
        :alt="order.name"
        class="w-56 -mt-5"
      >
    </figure>

    <!-- info -->
    <div class="text-center my-6">
      <p class="opacity-50 font-bold text-sm">
        {{ new Date(order.createdAt).toLocaleString() }}
      </p>
      <h4
        class="lora text-base font-bold my-1 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {{ order.name }}
      </h4>
      <p class="opacity-50 font-bold text-sm">
        {{ order.quantity }}x Unidade(s)
      </p>
    </div>

    <!-- price -->
    <div class="flex gap-5 justify-between items-center max-sm:flex-col">
      <p class="text-green-500 font-bold text-xl">
        {{ Real.format(order.price * order.quantity) }}
      </p>

      <UButton
        variant="outline"
        size="lg"
        color="black"
        class=""
      >
        Detalhes do Pedido <i class="bi-chevron-right" />
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IOrder } from "~/types";

// props
interface IProps {
  order: IOrder;
}
defineProps<IProps>();

// data
const Real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
</script>

<style scoped></style>
