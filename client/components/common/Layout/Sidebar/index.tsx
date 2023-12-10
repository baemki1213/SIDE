import { useState } from "react";

import * as S from "./styles";

import { StyledBurgerIcon } from "../../Icons/StyledBurgerIcon";
import StyledText from "../../StyledText";

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
      <S.SidebarIcon data-testid="sidebar-icon" isClickOpen={isClickOpen}>
        <StyledBurgerIcon
          handleClick={handleClickToggleSidebar}
          isOpen={isClickOpen}
        />
      </S.SidebarIcon>

      <S.SidebarTrigger
        data-testid="sidebar-trigger"
        onMouseEnter={() => setIsHoverOpen(true)}
        onMouseLeave={() => setIsHoverOpen(false)}
      />
      <S.SidebarContainer
        data-testid="sidebar-container"
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={() => setIsHoverOpen(false)}
        isHoverOpen={isHoverOpen}
        isClickOpen={isClickOpen}
      >
        <S.SidebarInner>
          <StyledText text="주변 맛집 구경하기" />
          <StyledText text="주변 맛집 AI 추천" />
          <StyledText text="주변 맛집 월드컵 만들기" />
          <StyledText text="내가 갔었던 맛집" />
          <StyledText text="다른 사람들이 고른 주변 맛집" />
          <StyledText text="주변 맛집 랜덤 추천" />
        </S.SidebarInner>
      </S.SidebarContainer>
    </>
  );
};

export default Sidebar;
