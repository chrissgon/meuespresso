import { INav } from "../types";

export const useAppStore = defineStore(
  "appStore",
  () => {
    // data
    const nav = reactive<INav>([
      {
        path: "/",
        label: "Inicio",
        icon: "bi-house",
      },
      {
        path: "/account",
        label: "Conta",
        icon: "bi-person",
      },
    ]);
    const errors = reactive<any>([]);
    const operations = reactive<any>([]);

    // methods
    function setError({ operation, err }: any): void {
      errors[operation] = err;
    }
    function removeError({ operation }: any): void {
      delete errors[operation];
    }
    function startOperation({ operation }: any): void {
      operations[operation] = true;
    }
    function stopOperation({ operation }: any): any {
      operations[operation] = false;
    }

    // getters
    const getError = computed<Function>(() => ({ operation }: any) => {
      return errors[operation];
    });
    const getOperation = computed<Function>(() => ({ operation }: any) => {
      return !!operations[operation];
    });

    return {
      nav,
      setError,
      removeError,
      startOperation,
      stopOperation,
      getError,
      getOperation,
    };
  },
  { persist: true }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
