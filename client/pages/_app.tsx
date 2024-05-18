import type { AppProps } from "next/app";

import Layout from "@/components/common/Layout/Layout";
import ToastComponent from "@/components/common/Toast";
import Modal from "@/components/common/Modal";

import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <ToastComponent />
      <Modal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  );
}
