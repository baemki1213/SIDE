import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/reduxHook";

import TextButton from "@/components/client/common/TextButton";

import { selectAuthState } from "@/store/authSlice";

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
            <TextButton
              text="회원가입"
              onClick={() => router.push("/account/register")}
              className="text-base font-medium text-black-47 hover:text-primary transition-colors"
            />
            <S.HeaderColumn />
            <TextButton
              text="로그인"
              onClick={() => router.push("/account/login")}
              className="text-base font-medium text-black-47 hover:text-primary transition-colors"
            />
          </>
        )}
      </S.HeaderRight>
    </S.HeaderContainer>
  );
};

export default Header;
