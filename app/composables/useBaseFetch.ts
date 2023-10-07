export const useBaseFetch = () => {
  const config = useRuntimeConfig();

  return {
    post<T>(url: string, options?: any) {
      return useFetch<T>(url, {
        ...options,
        method: "POST",
        baseURL: config.public.SERVER_URL,
      });
    },
    get<T>(url: string, options?: any) {
      return useFetch<T>(url, {
        ...options,
        method: "GET",
        baseURL: config.public.SERVER_URL,
      });
    },
  };
};
