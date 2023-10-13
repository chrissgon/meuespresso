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
        <a href="#collection">
          <UButton
            class="w-fit text-base px-6"
            size="lg"
          > Explorar </UButton>
        </a>
      </main>

      <!-- slider -->
      <MoleculeProductSliderView
        :error="getError({ operation: EOperations.ProductsGet })"
        :loading="getOperation({ operation: EOperations.ProductsGet })"
        :products="productStore.products"
      />
    </div>

    <!-- collection -->
    <article
      id="collection"
      class="w-full flex flex-col gap-5 pt-10 md:px-5"
    >
      <!-- header -->
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

      <!-- error alert -->
      <UAlert
        v-if="getError({ operation: EOperations.ProductsGet })"
        icon="i-heroicons-exclamation-triangle"
        color="amber"
        variant="soft"
        :title="getError({ operation: EOperations.ProductsGet })"
      />

      <!-- products -->
      <MoleculeProductCardView
        :loading="
          getOperation({ operation: EOperations.ProductsGet }) ||
            getOperation({ operation: EOperations.ProductsFind })
        "
        :loading-item="getOperation({ operation: EOperations.UserAddToCart })"
        :products="productStore.productsFiltered"
        @add-to-cart="userStore.addToCart"
      />
    </article>
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

// watch
watch(
  () => getOperation({ operation: EOperations.UserAddToCart }),
  (unfinished: boolean) => {
    if (unfinished) return;
    const error = getError({ operation: EOperations.UserAddToCart });

    if (!error) {
      toast.add({
        title: "Produto adicionado com sucesso!",
        icon: "i-heroicons-check-circle",
        description: "Acesse seu carrinho clicando no icone no topo da página",
        color: "green",
        actions: [
          { label: "Ver carrinho", click: () => useRouter().push("/cart") },
        ],
      });
      return;
    }

    toast.add({
      title: error,
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
