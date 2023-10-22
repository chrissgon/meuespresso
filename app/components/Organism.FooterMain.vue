<template>
  <footer
    class="w-full flex max-sm:flex-col max-sm:gap-8 justify-between items-center bg-gray-100 dark:bg-gray-900"
  >
    <!-- social -->
    <aside class="text-xl flex gap-5 [&_a]:cursor-pointer [&_a]:opacity-50">
      <a
        href="https://www.linkedin.com/in/chrissgon/"
        target="_blank"
        class="inline-flex bi bi-linkedin hover:opacity-100"
      />
      <a
        href="https://github.com/chrissgon"
        target="_blank"
        class="inline-flex bi bi-github hover:opacity-100"
      />
      <a
        href="https://www.behance.net/chrissgon"
        target="_blank"
        class="inline-flex bi bi-behance hover:opacity-100"
      />
    </aside>

    <!-- author -->
    <p class="text-center text-base">
      <span class="opacity-50">Developed by</span>
      <br>
      <a
        href="https://www.linkedin.com/in/chrissgon/"
        target="_blank"
      >Christopher Gonçalves</a>
    </p>

    <!-- logo -->
    <NuxtLink to="/">
      <img
        src="/logo.svg"
        alt="Meu Espresso Logo"
        class="w-8 sm:w-10"
      >
    </NuxtLink>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
