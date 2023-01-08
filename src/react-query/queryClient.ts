// eslint-disable-next-line import/no-extraneous-dependencies
// import { createStandaloneToast } from "@chakra-ui/react";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { notification } from "antd";

// import { theme } from "../theme";

// const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : "error connecting to server";
  console.log(title, "title");
  // prevent duplicate toasts
  // toast.closeAll();
  notification.error({ message: title, placement: "bottom" });
  // toast({ title, status: "error", variant: "subtle", isClosable: true });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      const title =
        error instanceof Error ? error.message : "error connecting to server";
      console.log(title);
      notification.error({
        message: title,
        placement: "bottom",
        style: { backgroundColor: "pink" },
      });
    },
  }),
});
