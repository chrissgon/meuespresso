<template>
  <div
    class="w-full max-w-full lg:max-w-[45%] h-[500px] rounded-3xl px-10 md:px-14 flex flex-col justify-center items-center gap-10 overflow-hidden"
  >
    <USkeleton class=" h-40 w-full" />
    <div class="w-full flex flex-col items-center gap-2 mt-10">
      <USkeleton class="h-6 w-full mb-2" />
      <USkeleton class="h-6 w-full mb-2" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
