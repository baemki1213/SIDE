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

import * as S from "./styles";
import Gap from "../../Gap";

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
  const handleLogout = () => {
    console.log("logout");
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
            <S.SidebarMenu>
              <FaMapMarkerAlt />
              <Gap side={5} />
              <StyledText
                text="장소 찾기"
                fontWeight="semiBold"
                fontColor="mainColor"
              />
            </S.SidebarMenu>
            <S.SidebarMenu>
              <FaRobot />
              <Gap side={5} />
              <StyledText
                text="AI 추천"
                fontWeight="semiBold"
                fontColor="mainColor"
              />
            </S.SidebarMenu>
            <S.SidebarMenu>
              <FaGlobe />
              <Gap side={5} />
              <StyledText
                text="월드컵 만들기"
                fontWeight="semiBold"
                fontColor="mainColor"
              />
            </S.SidebarMenu>
            <S.SidebarMenu>
              <FaHistory />
              <Gap side={5} />
              <StyledText
                text="내 방문 기록"
                fontWeight="semiBold"
                fontColor="mainColor"
              />
            </S.SidebarMenu>
            <S.SidebarMenu>
              <FaStar />
              <Gap side={5} />
              <StyledText
                text="인기있는 장소"
                fontWeight="semiBold"
                fontColor="mainColor"
              />
            </S.SidebarMenu>
            <S.SidebarMenu>
              <FaRandom />
              <Gap side={5} />
              <StyledText
                text="랜덤 추천"
                fontWeight="semiBold"
                fontColor="mainColor"
              />
            </S.SidebarMenu>
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
