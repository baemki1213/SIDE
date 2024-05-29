import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/reduxHook";

import StyledTextButton from "../../StyledTextButton";
import Sidebar from "../Sidebar";
import StyledText from "../../StyledText";

import * as S from "./styles";
import { selectAuthState } from "@/store/authSlice";

const Header = () => {
  const router = useRouter();
  const { isLogin, userInfo, access_token } = useAppSelector(selectAuthState);

  return (
    <S.HeaderContainer>
      <S.HeaderLeft>
        <Sidebar isLogin={isLogin} token={access_token} />
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
                <StyledText
                  text={userInfo.nickname.slice(0, 1)}
                  fontColor="mainWhite"
                  fontWeight="bold"
                />
              </S.HeaderDefaultAvatar>
            )}

            <StyledText
              text={`${userInfo?.nickname}님 환영합니다.`}
              fontWeight="semiBold"
            />
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
