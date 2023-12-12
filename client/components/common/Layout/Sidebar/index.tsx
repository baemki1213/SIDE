import { useState } from "react";
import { useRouter } from "next/router";
import {
  FaMapMarkerAlt,
  FaHistory,
  FaStar,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

import { useLogout } from "@/hooks/user/login/useLogout";

import { StyledBurgerIcon } from "../../Icons/StyledBurgerIcon";
import StyledText from "../../StyledText";
import StyledTextButton from "../../StyledTextButton";
import Gap from "../../Gap";

import * as S from "./styles";

interface Props {
  isLogin: boolean;
}

const Sidebar = ({ isLogin }: Props) => {
  const router = useRouter();
  const { mutate: logout, isLoading: logoutIsLoading } = useLogout();
  const [isClickOpen, setIsClickOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);

  const navData = [
    { id: "", icon: <FaHome />, text: "홈" },
    { id: "service/map", icon: <FaMapMarkerAlt />, text: "맛집 찾기" },
    { id: "my-history", icon: <FaHistory />, text: "나의 기록" },
    { id: "service/popular", icon: <FaStar />, text: "인기 장소" },
  ];
  const handleClickToggleSidebar = () => {
    setIsClickOpen(!isClickOpen);
  };
  const handleContainerMouseEnter = () => {
    if (!isClickOpen) {
      setIsHoverOpen(true);
    }
  };
  const handleLogout = async () => {
    await logout({});
  };
  const handleNavIconClick = (id: string) => {
    router.push(`/${id}`);
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
          {isLogin && (
            <S.SidebarFooter>
              <FaSignOutAlt />
              <Gap side={5} />
              <StyledTextButton
                buttonType="button"
                styleProps={{ text: "로그아웃" }}
                handleClick={handleLogout}
              />
            </S.SidebarFooter>
          )}
        </S.SidebarInner>
      </S.SidebarContainer>
    </>
  );
};

export default Sidebar;

// { id: "service/ai-recommendation", icon: <FaRobot />, text: "AI 추천" },
// { id: "service/food-worldcup", icon: <FaGlobe />, text: "맛집 월드컵" },
// { id: "service/random", icon: <FaRandom />, text: "랜덤 추천" },
