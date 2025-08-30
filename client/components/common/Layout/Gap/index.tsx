import { CSSProperties } from "react";

import { gap } from "./Gap.css";

interface GapProps {
  side: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  className?: string;
}

export default function Gap({
  side,
  minWidth,
  minHeight,
  className,
}: GapProps) {
  const style: CSSProperties = {
    width: typeof side === "string" ? side : `${side}px`,
    height: typeof side === "string" ? side : `${side}px`,
    minWidth: minWidth
      ? typeof minWidth === "string"
        ? minWidth
        : `${minWidth}px`
      : undefined,
    minHeight: minHeight
      ? typeof minHeight === "string"
        ? minHeight
        : `${minHeight}px`
      : undefined,
  };

  return <div className={`${gap} ${className || ""}`} style={style} />;
}
