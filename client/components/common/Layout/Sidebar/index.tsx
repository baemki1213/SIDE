import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaRobot,
  FaGlobe,
  FaHistory,
  FaStar,
  FaRandom,
  FaSignOutAlt,
} from "react-icons/fa";

import { StyledBurgerIcon } from "../../Icons/StyledBurgerIcon";
import StyledText from "../../StyledText";
import StyledTextButton from "../../StyledTextButton";
import Gap from "../../Gap";

import * as S from "./styles";

const Sidebar = () => {
  const [isClickOpen, setIsClickOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);

  const navData = [
    { id: "map", icon: <FaMapMarkerAlt />, text: "맛집 찾기" },
    { id: "ai", icon: <FaRobot />, text: "AI 추천" },
    { id: "cup", icon: <FaGlobe />, text: "맛집 월드컵" },
    { id: "my", icon: <FaHistory />, text: "나의 기록" },
    { id: "popular", icon: <FaStar />, text: "인기 장소" },
    { id: "random", icon: <FaRandom />, text: "랜덤 추천" },
  ];
  const handleClickToggleSidebar = () => {
    setIsClickOpen(!isClickOpen);
  };
  const handleContainerMouseEnter = () => {
    if (!isClickOpen) {
      setIsHoverOpen(true);
    }
  };
  const handleLogout = () => {
    console.log("logout");
  };
  const handleNavIconClick = (id: string) => {
    console.log(id);
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
          <S.SidebarBody>
            {navData.map(data => {
              return (
                <S.SidebarMenu
                  onClick={() => handleNavIconClick(data.id)}
                  aria-label={data.text}
                  key={data.text}
                >
                  {data.icon}
                  <Gap side={5} />
                  <StyledText text={data.text} />
                </S.SidebarMenu>
              );
            })}
          </S.SidebarBody>

          <S.SidebarFooter>
            <FaSignOutAlt />
            <Gap side={5} />
            <StyledTextButton
              buttonType="button"
              styleProps={{ text: "로그아웃" }}
              handleClick={handleLogout}
            />
          </S.SidebarFooter>
        </S.SidebarInner>
      </S.SidebarContainer>
    </>
  );
};

export default Sidebar;
