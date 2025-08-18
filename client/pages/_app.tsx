import type { AppProps } from "next/app";

import { createGlobalStyle } from "styled-components";

import Layout from "@/components/common/Layout/Layout";
import Modal from "@/components/common/Modal";
import ToastComponent from "@/components/common/Toast";

import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";

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
