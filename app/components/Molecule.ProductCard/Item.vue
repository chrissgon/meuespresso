<template>
  <div>
    product card item
    <!-- {{ productStore.products }} -->
  </div>
</template>
  
  <script setup lang="ts">
  import { IProduct } from '~/types';
  
  // props
  interface IProps {
    product: IProduct
  }
  const props = defineProps<IProps>();
  </script>
  
  <style scoped></style>
  