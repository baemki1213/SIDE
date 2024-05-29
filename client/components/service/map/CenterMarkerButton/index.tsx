import { createRoot } from "react-dom/client";
import React, { useEffect, ReactNode } from "react";

interface CenterMarkerButtonProps {
  map: naver.maps.Map;
  position: any;
  children: ReactNode;
}

const CenterMarkerButton: React.FC<CenterMarkerButtonProps> = ({
  map,
  position,
  children,
}) => {
  useEffect(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = "100";
    div.style.padding = "10px";
    div.style.borderRadius = "5px";
    div.style.display = "flex";
    div.style.gap = "10px";

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation(); // 이벤트 전파 방지
    };
    div.addEventListener("click", handleClick);
    map.getPanes().overlayLayer.appendChild(div);

    const updatePosition = () => {
      const projection = map.getProjection();
      const pos = projection.fromCoordToOffset(position);
      div.style.top = `${pos.y - 80}px`;
      div.style.left = `${pos.x - 141}px`;
    };

    updatePosition();
    naver.maps.Event.addListener(map, "idle", updatePosition);

    const root = createRoot(div);
    root.render(children);

    return () => {
      root.unmount();
      div.parentNode?.removeChild(div);
      div.removeEventListener("click", handleClick);
    };
  }, [map, position, children]);

  return null;
};

export default CenterMarkerButton;
