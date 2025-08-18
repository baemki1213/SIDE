import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/reduxHook";

import { selectAuthState } from "@/store/authSlice";

import StyledTextButton from "../../StyledTextButton";
import Text from "../../Text";
import Sidebar from "../Sidebar";
import * as S from "./styles";

const Header = () => {
  const router = useRouter();
  const { isLogin, userInfo } = useAppSelector(selectAuthState);

  return (
    <S.HeaderContainer>
      <S.HeaderLeft>
        <Sidebar isLogin={isLogin} />
      </S.HeaderLeft>
      <S.HeaderRight>
        {isLogin ? (
          <>
            {userInfo.profile_image ? (
              <S.HeaderAvatar
                src={userInfo?.profile_image}
                alt="profile image"
              />
            ) : (
              <S.HeaderDefaultAvatar data-testid="header-defaultAvatar">
                <Text className="text-white text-base font-bold">
                  {userInfo.nickname.slice(0, 1)}
                </Text>
              </S.HeaderDefaultAvatar>
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
            <S.HeaderColumn />
            <StyledTextButton
              buttonType="button"
              styleProps={{ text: "로그인", fontColor: "black47" }}
              handleClick={() => router.push("/account/login")}
            />
          </>
        )}
      </S.HeaderRight>
    </S.HeaderContainer>
  );
};

export default Header;
