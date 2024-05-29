import type { AppProps } from "next/app";

import Layout from "@/components/common/Layout/Layout";
import ToastComponent from "@/components/common/Toast";
import Modal from "@/components/common/Modal";

import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";
import { createGlobalStyle } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <GlobalStyle />
      <ToastComponent />
      <Modal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  );
}

const GlobalStyle = createGlobalStyle`
  /* Hide scrollbar for all browsers */
  body {
    overflow: hidden;
  }

  /* Optional: Hide scrollbar for specific elements */
  * {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  *::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, and Opera */
  }
`;
