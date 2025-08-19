"use client";

import React from "react";

import { DotSpinner } from "@/components/common/LoadingIndicator";
import Text from "@/components/common/Text";

import { cn } from "@/utils/styles/style-utils";

interface TextButtonProps {
  children?: React.ReactNode;
  text?: string;
  type?: "button" | "submit" | "reset";

  // 🎯 상태 관리
  disabled?: boolean;
  isLoading?: boolean;

  // 🎨 순수 Tailwind 방식
  className?: string;

  // 🔗 이벤트
  onClick: () => void;

  // 🎭 아이콘 (선택적)
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function TextButton({
  children,
  text,
  type = "button",
  disabled = false,
  isLoading = false,
  className,
  onClick,
  icon,
  iconPosition = "left",
}: TextButtonProps) {
  // 🎭 아이콘 렌더링 헬퍼
  const renderContent = () => {
    const textContent = children || text;

    if (isLoading) {
      return (
        <div className="flex items-center justify-center">
          <DotSpinner width="20px" size="4px" />
        </div>
      );
    }

    if (icon) {
      return (
        <div className="flex items-center gap-1">
          {iconPosition === "left" && icon}
          {textContent}
          {iconPosition === "right" && icon}
        </div>
      );
    }

    return textContent;
  };

  return (
    <button
      type={type}
      onClick={disabled || isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      className={cn(
        // 🎨 기본 스타일
        "bg-transparent border-none p-0 m-0 cursor-pointer",
        "transition-all duration-200 ease-in-out",
        "hover:opacity-80 active:opacity-60",
        // 🎯 상태별 스타일
        disabled && "opacity-50 cursor-not-allowed hover:opacity-50",
        isLoading && "cursor-wait hover:opacity-100",
        // 🎨 정의 스타일이 우선
        className,
      )}
    >
      <Text className="select-none">{renderContent()}</Text>
    </button>
  );
}
