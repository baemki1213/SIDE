"use client";

import { createGlobalStyle } from "styled-components";

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

export default GlobalStyle;
