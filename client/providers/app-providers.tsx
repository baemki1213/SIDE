import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";

import { useState } from "react";
import { Provider } from "react-redux";

import { ThemeProvider } from "styled-components";

import { RouteProvider } from "@/context/RouteContext";

import { persistor, store } from "../store";
import { darkTheme, lightTheme } from "../styles/assets";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: any) => {
  const [theme, setTheme] = useState(lightTheme);
  // 리덕스로 관리하면 좋을듯
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <RouteProvider>{children}</RouteProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};
