<template>
  <div>
    {{ userStore.user }}
  </div>
</template>
  
  <script setup lang="ts">
  // data
  const userStore = useUserStore();
  
  if(!userStore.isLogged){
      useRouter().push("/account")
  }
  </script>
  
  <style scoped>
  
  </style>