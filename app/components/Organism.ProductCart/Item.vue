<template>
  <div

    class="w-full flex max-sm:flex-col flex-1 items-center border dark:border-gray-800 rounded-md"
  >
    <!-- image -->
    <figure class="h-24 flex items-center">
      <img
        :src="item.image"
        :alt="item.name"
        class="w-72 min-w-[12rem]"
      >
    </figure>

    <article class="w-full p-4 sm:pl-0">
      <!-- header -->
      <header class="flex-auto h-fit flex justify-between">
        <h4
          class="lora text-base font-bold my-1 whitespace-nowrap text-ellipsis overflow-hidden"
        >
          {{ item.name }}
        </h4>

        <UButton
          variant="link"
          color="red"
          :disabled="loading"
          @click="remove"
        >
          Remover
        </UButton>
      </header>

      <!-- footer -->
      <footer class="flex justify-between items-center flex-auto mt-2">
        <p class="text-green-500 font-bold text-base">
          {{ Real.format(item.price * item.quantity) }}
        </p>

        <!-- quantity -->
        <div class="flex items-center gap-3">
          <UButton
            variant="solid"
            color="gray"
            icon="i-heroicons-minus"
            disabled
          />
          <span>{{ item.quantity }}</span>
          <UButton
            variant="solid"
            color="gray"
            icon="i-heroicons-plus"
            disabled
          />
          <!-- :disabled="disableAddButton" -->
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ICartItem } from "~/types";

// props
interface IProps {
  item: ICartItem;
  loading: boolean
}
const props = defineProps<IProps>();

// computed
// const disableDelButton = computed<boolean>(() => {
//   return props.item.quantity.value === 1;
// });
// const disableAddButton = computed<boolean>(() => {
//   return quantity.value === props.item.quantity;
// });

// data
const Real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
// const quantity = ref<number>(1);

// methods
function remove():void{
  emit("remove", props.item)
}

// emits
interface IEmits{
  (e: "remove", item:ICartItem):void
}
const emit = defineEmits<IEmits>()
// function addQuantity(): void {
//   props.item.quantity = props.item.quantity + 1;
// }
// function delQuantity(): void {
//   props.item.quantity = props.item.quantity - 1;
// }
</script>

<style scoped></style>
