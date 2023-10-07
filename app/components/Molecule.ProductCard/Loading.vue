<template>
  <div
    class="flex w-full min-w-[350px] md:max-w-[45%] lg:max-w-[18rem] flex-col items-center justify-center"
  >
    <USkeleton class="h-32 w-full" />
    <div class="w-full flex flex-col items-center gap-2 mt-10">
      <USkeleton class="h-6 w-full mb-2" />
      <USkeleton class="h-4 w-[200px]" />
    </div>

    <div class="w-full p-4 mt-14">
      <USkeleton class="h-10 w-full mt-10" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
