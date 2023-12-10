import { useState } from "react";

import * as S from "./styles";

import { HeaderIcon } from "../Header/styles";
import { StyledBurgerIcon } from "../../Icons/StyledBurgerIcon";

const Sidebar = () => {
  const [isClickOpen, setIsClickOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);

  const handleClickToggleSidebar = () => {
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
        <StyledBurgerIcon
          handleClick={handleClickToggleSidebar}
          isOpen={isClickOpen}
        />
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
        <S.SidebarInner>asd</S.SidebarInner>
      </S.SidebarContainer>
    </>
  );
};

export default Sidebar;
