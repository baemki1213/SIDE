import ToastComponent from "@/components/common/Toast";
import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <ToastComponent />
      <Component {...pageProps} />
    </AppProviders>
  );
}
