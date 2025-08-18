import React from "react";

import { cn } from "@/utils/styles/style-utils";

interface TextProps {
  children?: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Text({
  children,
  className,
  as: Component = "p",
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        // 기본 스타일만 최소한으로
        "text-main transition-colors duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
