import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/assets";
import { useState } from "react";
import { RouteProvider } from "@/context/RouteContext";

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
