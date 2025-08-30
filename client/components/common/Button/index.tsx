import { ReactNode } from "react";

import { DotSpinner } from "../LoadingIndicator";
import {
  ButtonIconPosition,
  ButtonSize,
  ButtonVariant,
  ButtonWidth,
  buttonRecipe,
  loadingContainer,
} from "./Button.css";

interface ButtonProps {
  children?: ReactNode;
  text?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  size?: ButtonSize;
  width?: ButtonWidth;
  onClick?: (e: any) => void;
  disabled?: boolean;
  borderRadius?: string;
  iconPosition?: ButtonIconPosition;
  icon?: ReactNode;
  isLoading?: boolean;
  opacity?: number;
  className?: string;
}

interface IconButtonProps {
  iconPosition?: ButtonIconPosition;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function Button({
  children = null,
  text = "",
  variant = "primary",
  type = "button",
  size = "regular",
  width = "full",
  onClick,
  disabled = false,
  borderRadius = "4px",
  iconPosition = "none",
  icon,
  isLoading = false,
  opacity = 1,
  className,
}: ButtonProps) {
  const IconButton = ({ iconPosition, icon, children }: IconButtonProps) => {
    if (iconPosition === "left") {
      return (
        <>
          {icon}
          {children}
        </>
      );
    }
    if (iconPosition === "right") {
      return (
        <>
          {children}
          {icon}
        </>
      );
    }
    return <>{children}</>;
  };

  return (
    <button
      className={`${buttonRecipe({
        variant: disabled ? "disabled" : variant,
        size,
        width,
        iconPosition,
      })} ${className || ""}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      style={{
        borderRadius,
        opacity: disabled ? 0.6 : opacity,
      }}
    >
      {isLoading ? (
        <div className={loadingContainer}>
          <DotSpinner buttonType={variant} width="40px" size="5px" />
        </div>
      ) : (
        <IconButton iconPosition={iconPosition} icon={icon}>
          {children}
          {text && <span>{text}</span>}
        </IconButton>
      )}
    </button>
  );
}
