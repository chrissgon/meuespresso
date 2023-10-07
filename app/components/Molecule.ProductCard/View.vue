<template>
  <section>
    <!-- loading -->
    <aside
      v-show="loading"
      class="flex gap-6 overflow-hidden"
    >
      <MoleculeProductCardLoading
        v-for="i in 6"
        :key="i"
      />
    </aside>

    <!-- view -->
    <article
      v-show="!loading"
      class="flex max-sm:flex-col gap-6 overflow-x-auto overflow-y-hidden py-5"
    >
      <!-- item -->
      <MoleculeProductCardItem
        v-for="(product, i) in products"
        :key="i"
        :product="product"
        :loading="loadingItem"
        @addToCart="(product) => $emit('addToCart', product)"
      />
    </article>
  </section>
</template>

<script setup lang="ts">
import { IProducts } from "~/types";

// props
interface IProps {
  products: IProducts | null;
  loading?: boolean;
  loadingItem?: boolean;
}
defineProps<IProps>();

// emits
defineEmits(["addToCart"]);
</script>

<style scoped></style>
