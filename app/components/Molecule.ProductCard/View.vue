<template>
  <aside
    v-if="loading"
    class="flex gap-6 overflow-hidden"
  >
    <MoleculeProductCardLoading
      v-for="i in 6"
      :key="i"
    />
  </aside>
  <article
    v-else
    class="flex gap-6 overflow-x-auto overflow-y-hidden py-5"
  >
    <!-- item -->
    <div
      v-for="(product, i) in products"
      :key="i"
      class="border dark:border-gray-800 px-10 py-10 h-fit max-sm:min-w-full sm:min-w-[350px] lg:max-w-[24rem] rounded-lg"
    >
      <!-- image -->
      <figure class="h-36  flex items-center justify-center">
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
        <p class="  line-clamp-2 mt-2">
          {{ product.description }}
        </p>
      </div>

      <!-- price -->
      <div class="flex justify-between text-green-500 my-5 font-bold text-xl">
        <p>{{ Real.format(product.price) }}</p>
      </div>

      <!-- action -->
      <UButton
        size="lg"
        block
      >
        Adicionar ao Carrinho
      </UButton>
    </div>
    
    <!-- <MoleculeProductCardItem
      v-for="(product, i) in products"
      :key="i"
      :product="product"
    /> -->
    <!-- {{ productStore.products }} -->
  </article>
</template>

<script setup lang="ts">
import { IProducts } from '~/types';

// props
interface IProps {
  loading?: boolean;
  products: IProducts | null
}
const props = defineProps<IProps>();

// data
const Real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
</script>

<style scoped></style>
