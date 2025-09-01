import Image from "next/image";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/reduxHook";

import { selectAuthState } from "@/store/authSlice";

import StyledTextButton from "../../StyledTextButton";
import Text from "../../Text";
import Sidebar from "../Sidebar";
import {
  HeaderIconWidth,
  headerAvatar,
  headerColumn,
  headerContainer,
  headerDefaultAvatar,
  headerIconRecipe,
  headerLeft,
  headerRight,
} from "./Header.css";

interface HeaderIconProps {
  width?: HeaderIconWidth;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const HeaderIcon = ({
  width = "default",
  onClick,
  children,
  className,
}: HeaderIconProps) => (
  <div
    className={`${headerIconRecipe({ width })} ${className || ""}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const Header = () => {
  const router = useRouter();
  const { isLogin, userInfo } = useAppSelector(selectAuthState);

  return (
    <header className={headerContainer}>
      <div className={headerLeft}>
        <Sidebar isLogin={isLogin} />
      </div>
      <div className={headerRight}>
        {isLogin ? (
          <>
            {userInfo.profile_image ? (
              <Image
                className={headerAvatar}
                src={userInfo?.profile_image}
                alt="profile image"
                width={30}
                height={30}
              />
            ) : (
              <div
                className={headerDefaultAvatar}
                data-testid="header-defaultAvatar"
              >
                <Text className="text-white text-base font-bold">
                  {userInfo.nickname.slice(0, 1)}
                </Text>
              </div>
            )}

            <Text className="text-black-47 text-base font-semibold">
              {`${userInfo?.nickname}님 환영합니다.`}
            </Text>
          </>
        ) : (
          <>
            <StyledTextButton
              buttonType="button"
              styleProps={{ text: "회원가입", fontColor: "black47" }}
              handleClick={() => router.push("/account/register")}
            />
            <div className={headerColumn} />
            <StyledTextButton
              buttonType="button"
              styleProps={{ text: "로그인", fontColor: "black47" }}
              handleClick={() => router.push("/account/login")}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
