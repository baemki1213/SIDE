/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors
      colors: {
        primary: {
          DEFAULT: "#1e4083",
          50: "#eff6ff",
          500: "#1e4083",
          900: "#0f2654",
        },
        main: "#0D0D0D",
        gray: {
          26: "#262626",
          59: "#595959",
          "8c": "#8c8c8c",
          75: "#757575",
          130: "rgb(130, 140, 148)",
          db: "#dbdbdb",
          ed: "#ededed",
          "disabled-back": "rgb(247, 248, 250)",
          "disabled-color": "rgb(194, 200, 204)",
          "disabled-border": "rgb(218, 220, 224)",
        },
        black: {
          DEFAULT: "#000000",
          47: "rgb(47,52,56)",
        },
        red: {
          ff: "#ff7777",
        },
      },
      // fontSize
      fontSize: {
        xxs: ["10px", "14px"],
        xs: ["12px", "16px"],
        sm: ["14px", "18px"],
        base: ["16px", "22px"],
        lg: ["18px", "26px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
        "4xl": ["36px", "normal"],
      },

      // 지도 서비스 특화 간격
      spacing: {
        marker: "2.25rem", // 36px - 마커 크기
        control: "3rem", // 48px - 컨트롤 버튼
        "map-padding": "1rem", // 지도 여백
      },

      // 반응형 breakpoints
      screens: {
        mobile: "480px",
        tablet: "768px",
        desktop: "1024px",
        wide: "1200px",
      },

      // 지도 서비스 특화 그림자
      boxShadow: {
        "map-control": "0 2px 10px rgba(0, 0, 0, 0.1)",
        "info-window": "0 4px 20px rgba(0, 0, 0, 0.15)",
        floating: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },

      // 애니메이션
      animation: {
        "marker-bounce": "bounce 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.3s ease-out",
      },

      // 배경 이미지
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
