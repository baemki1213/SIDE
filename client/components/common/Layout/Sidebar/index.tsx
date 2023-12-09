import { useState } from "react";

import * as S from "./styles";

import { HeaderIcon } from "../Header/styles";

const Sidebar = () => {
  const [isClickOpen, setIsClickOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);

  const clickToggleSidebar = () => {
    setIsClickOpen(!isClickOpen);
  };
  const handleContainerMouseEnter = () => {
    if (!isClickOpen) {
      setIsHoverOpen(true);
    }
  };

  return (
    <>
      <S.SidebarIcon isHoverOpen={isHoverOpen} isClickOpen={isClickOpen}>
        <HeaderIcon onClick={clickToggleSidebar}>icon</HeaderIcon>
      </S.SidebarIcon>
      <S.SidebarTrigger
        onMouseEnter={() => setIsHoverOpen(true)}
        onMouseLeave={() => setIsHoverOpen(false)}
      />
      <S.SidebarContainer
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={() => setIsHoverOpen(false)}
        isHoverOpen={isHoverOpen}
        isClickOpen={isClickOpen}
      >
        asdasd
      </S.SidebarContainer>
    </>
  );
};

export default Sidebar;
