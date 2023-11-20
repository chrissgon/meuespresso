import { EErrors, EOperations, ICartItem, IProduct, IUser } from "~/types";

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

    async function getUser(): Promise<void> {
      if (!user.value) return;

      const operation = EOperations.UserGet;
      const err = EErrors.UserGet;

      startOperation({ operation });

      const body = { userID: user.value?.userID };

      const { data, error } = await post<IUser>("/getUser", { body });

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });
      user.value = data.value;
    }

    async function addToCart(product: IProduct): Promise<void> {
      if (!isLogged.value) {
        useRouter().push("/account");
        return;
      }

      const operation = EOperations.UserAddToCart;
      const err = EErrors.UserAddToCart;

      startOperation({ operation });

      const body = {
        userID: user.value?.userID,
        productID: product.productID,
        quantity: product.quantity,
      };

      const { error } = await post<string>("/addToCart", { body });

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });
      getUser();
    }

    async function removeFromCart({ productID }: ICartItem): Promise<void> {
      const operation = EOperations.UserRemoveFromCart;
      const err = EErrors.UserRemoveFromCart;

      startOperation({ operation });

      const body = {
        userID: user.value?.userID,
        productID,
      };

      const { error } = await post<string>("/removeFromCart", { body });

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });
      getUser();
    }
    async function buy({
      address,
      addressNumber,
      addressComplement,
      shipping,
    }: any): Promise<void> {
      const operation = EOperations.UserBuy;
      const err = EErrors.UserBuy;

      startOperation({ operation });

      const body = {
        userID: user.value?.userID,
        products: user.value?.cart,
        address,
        addressNumber,
        addressComplement,
        shipping,
        resetCart: true,
      };

      const { error } = await post<string>("/buy", { body });

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });
      getUser();
    }
    async function updateUser({
      address,
      addressNumber,
      addressComplement,
      password,
    }: any): Promise<void> {
      const operation = EOperations.UserUpdate;
      const err = EErrors.UserUpdate;

      startOperation({ operation });

      const body = {
        userID: user.value?.userID,
        address,
        addressNumber,
        addressComplement,
        password,
      };

      const { error, data } = await post<IUser>("/updateUser", { body });

      stopOperation({ operation });

      if (error.value) {
        setError({ operation, err });
        return;
      }

      removeError({ operation });

      user.value = data.value;
    }

    // getters
    const isLogged = computed<boolean>(() => user.value !== null);
    const getCartSize = computed<number>(() => user.value?.cart.length ?? 0);

    return {
      user,
      login,
      getUser,
      logout,
      addToCart,
      removeFromCart,
      buy,
      updateUser,
      isLogged,
      getCartSize,
    };
  },
  { persist: true }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
