<template>
  <div class="flex flex-col gap-4">
    <UAccordion
      class="border dark:border-gray-800 rounded-md pt-2"
      size="lg"
      variant="soft"
      color="black"
      :items="[{ label: 'Carrinho', slot: 'items' }]"
      default-open
    >
      <template #items>
        <div class="px-3.5 flex flex-col gap-4">
          <!-- items -->
          <OrganismProductCartItem
            v-for="(item, i) in cart"
            :key="i"
            :item="item"
            :loading="loading"
            @remove="$emit('remove', item)"
          />
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup lang="ts">
import { ICart } from "~/types";

// props
interface IProps {
  cart: ICart;
  loading: boolean
}
defineProps<IProps>();

// emits
defineEmits(["remove"])
</script>

<style scoped></style>
