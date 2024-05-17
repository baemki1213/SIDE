import { colors } from "@/styles/assets";
import React, { useEffect, ReactNode } from "react";
import { createRoot } from "react-dom/client";

interface CenterMarkerBattleButtonProps {
  map: naver.maps.Map;
  position: any;
  onClick: () => void;
  children: ReactNode;
}

const CenterMarkerBattleButton: React.FC<CenterMarkerBattleButtonProps> = ({
  map,
  position,
  onClick,
  children,
}) => {
  useEffect(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = "10000";
    div.style.backgroundColor = colors.mainWhite;
    div.style.padding = "5px";
    div.style.borderRadius = "5px";
    div.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";

    map.getPanes().overlayLayer.appendChild(div);

    const handleClick = () => onClick();
    div.addEventListener("click", handleClick);

    const updatePosition = () => {
      const projection = map.getProjection();
      const pos = projection.fromCoordToOffset(position);
      div.style.top = `${pos.y + 30}px`;
      div.style.left = `${pos.x}px`;
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
  }, [map, position, onClick, children]);

  return null;
};

export default CenterMarkerBattleButton;
