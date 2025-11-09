"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { toast, Toaster } from "sonner";

const ProvidersWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount, error) {
          if (error instanceof AxiosError) {
            if (error.status === 401) {
              toast.error("Unauthorized");
              router.push("/login");
              return false; // Don't retry 401 errors
            }
            if (error.status === 404) {
              return false; // Don't retry 404 errors
            }
            console.log("Query error status:", error.status);
          }
          // Retry up to 2 times for other errors
          return failureCount < 2;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      },
      mutations: {
        onError(error) {
          if (error instanceof AxiosError) {
            if (error.status === 401) {
              toast.error("Unauthorized");
              router.push("/login");
            }
            console.log("Mutation error status:", error.status);
          }
        },
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-right" />

        {children}
      </QueryClientProvider>
    </>
  );
};
export default ProvidersWrapper;
