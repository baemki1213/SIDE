import { useState } from "react";
import {
  FaHistory,
  FaHome,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaStar,
} from "react-icons/fa";

import { useRouter } from "next/router";

import { useAppDispatch } from "@/hooks/reduxHook";
import { useLogout } from "@/hooks/user/login/useLogout";

import { deleteUser } from "@/api/user";
import { openModal } from "@/store/modalSlice";
import { showToast } from "@/store/toastSlice";

import Gap from "../../Gap";
import { StyledBurgerIcon } from "../../Icons/StyledBurgerIcon";
import StyledButton from "../../StyledButton";
import StyledText from "../../StyledText";
import StyledTextButton from "../../StyledTextButton";
import * as S from "./styles";

interface Props {
  isLogin: boolean;
}

const Sidebar = ({ isLogin }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: logout } = useLogout();
  const [isClickOpen, setIsClickOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);

  const navData = [
    { id: "", icon: <FaHome />, text: "홈" },
    { id: "service/map", icon: <FaMapMarkerAlt />, text: "장소 찾기" },
    { id: "my-history", icon: <FaHistory />, text: "나의 기록" },
    // { id: "service/popular", icon: <FaStar />, text: "인기 장소" },
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

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const data = await deleteUser();
      dispatch(showToast(data.data.message));
      await logout({});
      router.push("/");
    } catch (error: any) {
      dispatch(showToast(error.response.data.message));
    }

    setIsLoading(false);
  };

  const handleSignOutModalOpen = async () => {
    dispatch(
      openModal(
        <>
          <StyledText
            text="정말 탈퇴하시겠습니까?"
            fontColor="black47"
            fontSize="lg"
            fontWeight="semiBold"
          />
          <Gap side={20} />
          <StyledButton
            buttonType="secondary"
            text="네"
            onClick={handleSignOut}
            isLoading={isLoading}
          />
        </>,
      ),
    );
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
            {navData.map((data) => {
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

          {isLogin && <S.SidebarFooter></S.SidebarFooter>}

          {isLogin && (
            <>
              <S.SidebarFooter>
                <FaSignOutAlt />
                <Gap side={5} />
                <StyledTextButton
                  buttonType="button"
                  styleProps={{ text: "로그아웃" }}
                  handleClick={handleLogout}
                />
              </S.SidebarFooter>
              <S.SidebarFooter>
                <StyledTextButton
                  buttonType="button"
                  styleProps={{ text: "회원탈퇴" }}
                  handleClick={handleSignOutModalOpen}
                />
              </S.SidebarFooter>
            </>
          )}
        </S.SidebarInner>
      </S.SidebarContainer>
    </>
  );
};

export default Sidebar;
