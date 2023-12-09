import type { AppProps } from "next/app";

import Layout from "@/components/common/Layout/Layout";
import ToastComponent from "@/components/common/Toast";

import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <ToastComponent />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  );
}
