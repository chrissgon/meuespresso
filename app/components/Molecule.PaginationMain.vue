<template>
  <div class="flex gap-2">
    <!-- prev -->
    <UButton
      :disabled="disablePrevButton"
      color="gray"
      @click="prev"
    >
      <i class="bi-chevron-left" />
      <!-- next -->
    </UButton>
    <UButton
      :disabled="disableNextButton"
      color="gray"
      @click="next"
    >
      <i class="bi-chevron-right" />
    </UButton>
  </div>
</template>

<script setup lang="ts">
// props
interface IProps {
  size: number;
  perPage: number;
}
const props = defineProps<IProps>();

// computed
const start = computed<number>(() => {
  return props.perPage * page.value;
});
const end = computed<number>(() => {
  const final = start.value + props.perPage;
  return final > props.size ? props.size : final;
});
const disableNextButton = computed<boolean>(() => {
  return end.value >= props.size;
});
const disablePrevButton = computed<boolean>(() => {
  return page.value === 0;
});

// data
const page = ref<number>(0);

// methods
function next(): void {
  page.value = page.value + 1;
}
function prev(): void {
  page.value = page.value - 1;
}

defineExpose({ start, end });
</script>

<style scoped></style>
