import { EErrors, EOperations, IProduct, IUser } from "~/types";

export const useUserStore = defineStore(
  "userStore",
  () => {
    // data
    const { setError, removeError, startOperation, stopOperation } =
      useAppStore();
    const { post } = useBaseFetch();
    const user = ref<IUser | null>(null);

    // methods
    async function login({ email, password }: any): Promise<void> {
      const operation = EOperations.UserLogin;
      const err = EErrors.UserLogin;

      startOperation({ operation });

      const { data, error } = await post<IUser>("/login", {
        body: { email, password },
      });

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });
      user.value = data.value;
    }

    async function logout(): Promise<void> {
      user.value = null;
    }

    async function addToCart(product: IProduct): Promise<void> {
      if(!isLogged.value) {
        useRouter().push("/account")
        return
      }

      const operation = EOperations.UserAddToCart;
      const err = EErrors.UserAddToCart;

      startOperation({ operation });

      const body = {
        userID: user.value?.userID,
        productID: product.productID,
        quantity: product.quantity,
      };

      const {  error } = await post<string>("/addToCart", { body });

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });

      login(user.value)
    }

    // getters
    const isLogged = computed<boolean>(() => user.value !== null);
    const getCartSize = computed<number>(() => user.value?.cart.length ?? 0);

    return {
      user,
      login,
      logout,
      addToCart,
      isLogged,
      getCartSize,
    };
  },
  { persist: true }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
