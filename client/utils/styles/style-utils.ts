import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 기존 색상 시스템을 Tailwind 클래스로 변환하는 헬퍼
export const colorMap = {
  pointColor: "text-primary",
  mainColor: "text-main",
  mainWhite: "text-white",
  gray26: "text-gray-26",
  gray59: "text-gray-59",
  gray8c: "text-gray-8c",
  white: "text-white",
  redFF: "text-red-ff",
  black: "text-black",
  black47: "text-black-47",
  transparent: "text-transparent",
  gray130: "text-gray-130",
  grayDb: "text-gray-db",
  gray75: "text-gray-75",
  grayEd: "text-gray-ed",
} as const;

export const backgroundColorMap = {
  pointColor: "bg-primary",
  mainColor: "bg-main",
  mainWhite: "bg-white",
  gray26: "bg-gray-26",
  // ... 필요에 따라 확장
} as const;
