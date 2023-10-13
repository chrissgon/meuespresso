<template>
  <div class="md:px-10 py-6 pr-0">
    <h4 class="lora text-xl font-bold">
      Minhas Compras
    </h4>

    <!-- item -->
    <div class="flex w-full xl:w-max flex-wrap gap-4 my-6 max-w-[800px]">
      <OrganismAccountOrdersItem
        v-for="(order, i) in getOrdersByPagination"
        :key="i"
        :order="order"
        class="flex-1"
      />
    </div>

    <!--  pagination -->
    <div class="flex justify-center">
      <UPagination
        v-model="page"
        :page-count="perPage"
        :total="user.orders.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IOrders, IUser } from "~/types";
// props
interface IProps {
  user: IUser;
}
const props = defineProps<IProps>();

// computed
const getOrdersByPagination = computed<IOrders>(() => {
  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;

  return props.user.orders.slice(start, end);
});

// data
const page = ref<number>(1);
const perPage = ref<number>(4);
</script>

<style scoped></style>
