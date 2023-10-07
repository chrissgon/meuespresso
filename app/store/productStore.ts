import { EErrors, EOperations, IProducts } from "../types";

export const useProductStore = defineStore(
  "productStore",
  () => {
    // data
    const { setError, removeError, startOperation, stopOperation } =
      useAppStore();
    const { get } = useBaseFetch();
    const products = ref<IProducts | null>(null);
    const productsFiltered = ref<IProducts | null>(null);

    // methods
    async function getProducts(): Promise<void> {
      const operation = EOperations.ProductsGet;
      const err = EErrors.ProductsGet;

      startOperation({ operation });

      const { data, error } = await get<IProducts>("/products");

      // await new Promise((resolve) => setTimeout(resolve, 5000));

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });

      products.value = data.value;
      productsFiltered.value = data.value;
    }

    async function findProducts(filters: any): Promise<void> {
      const operation = EOperations.ProductsFind;
      const err = EErrors.ProductsFind;

      startOperation({ operation });

      const { data, error } = await get<IProducts>("/products", {
        params: filters,
      });

      // await new Promise((resolve) => setTimeout(resolve, 5000));

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });

      productsFiltered.value = data.value;
    }

    return {
      products,
      productsFiltered,
      getProducts,
      findProducts,
    };
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
