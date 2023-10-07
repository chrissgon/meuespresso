import { EErrors, EOperations, IUser } from "~/types";

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
      user.value = null
    }

    // getters
    const isLogged = computed<boolean>(() => user.value !== null);
    const getCartSize = computed<number>(() =>  user.value?.cart.length ?? 0)

    return {
      user,
      login,
      logout,
      isLogged,
      getCartSize
    };
  },
  { persist: true }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
