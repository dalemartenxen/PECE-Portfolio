import { QueryClient } from "@tanstack/react-query";

// Simplified QueryClient for frontend-only app
// Used primarily for loading states and caching static data
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
