<template>
  <section class="flex flex-wrap">
    <div class="w-full flex max-lg:flex-col gap-10">
      <!-- banner main -->
      <main
        class="main w-full max-w-full lg:max-w-[55%] lg:h-[500px] py-16 rounded-3xl px-10 md:px-14 flex flex-col justify-center text-white gap-10 overflow-hidden"
      >
        <h1 class="text-3xl md:text-4xl lora">
          O <b>seu expresso</b> com muito mais sabor ❤️
        </h1>
        <p class="md:text-lg">
          Oferecemos uma experiência única para os amantes de café. Explore,
          escolha e aproveite os itens do Meu Expresso.
        </p>
        <UButton
          class="w-fit text-base px-6"
          size="lg"
        >
          Explorar
        </UButton>
      </main>

      <MoleculeProductSliderView
        :error="getError({ operation: EOperations.ProductsGet })"
        :loading="getOperation({ operation: EOperations.ProductsGet })"
        :products="productStore.products"
      />
    </div>

    <article class="w-full flex flex-col gap-5 mt-10 md:px-5">
      <header class="flex max-sm:flex-col justify-between gap-4">
        <h2 class="lora text-2xl font-bold">
          Nossa Coleção
        </h2>
        <UInput
          v-model="search"
          type="search"
          size="lg"
          :loading="getOperation({ operation: EOperations.ProductsFind })"
          placeholder="Pesquise"
          icon="i-heroicons-magnifying-glass-20-solid"
          trailing
          @change="productStore.findProducts({ name: search })"
        />
      </header>

      <UAlert
        v-if="getError({ operation: EOperations.ProductsGet })"
        icon="i-heroicons-x-circle"
        color="amber"
        variant="soft"
        :title="getError({ operation: EOperations.ProductsGet })"
      />

      <MoleculeProductCardView
        :loading="
          getOperation({ operation: EOperations.ProductsGet }) ||
            getOperation({ operation: EOperations.ProductsFind })
        "
        :products="productStore.productsFiltered"
        @addToCart="userStore.addToCart"
      />
    </article>

    <UNotifications color="red" />
  </section>
</template>

<script setup lang="ts">
import { EOperations } from "~/types";

// data
const { getOperation, getError } = useAppStore();
const userStore = useUserStore();
const productStore = useProductStore();
const search = ref<string>("");
const toast = useToast();

watch(
  () => getError({ operation: EOperations.UserAddToCart }),
  (value: string) => {
    if (!value) {
      toast.add({
        title: "Produto adicionado com sucesso!",
        icon: "i-heroicons-check-circle",
        description: "Acesse seu carrinho clicando no icone no topo da página",
        color: "green",
      });
      return;
    }

    toast.add({
      title: value,
      icon: "i-heroicons-exclamation-triangle",
      description: "Não é possível adicionar o mesmo produto duas vezes",
      color: "red",
    });
  }
);
</script>

<style scoped>
.main {
  background: url(/banner-index.jpg) rgba(0, 0, 0, 1) center;
  background-size: cover;
}
</style>
