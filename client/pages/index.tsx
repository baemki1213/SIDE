import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import styled from "styled-components";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import StyledText from "@/components/common/StyledText";
import Text from "@/components/common/Text";

import { wrapper } from "@/store";
import { selectAuthState, setIsLogin } from "@/store/authSlice";
import { colors } from "@/styles/assets";

if (process.env.NEXT_PUBLIC_API_MOCKING === "true") {
  import("../mocks").then(({ setUpMocks }) => {
    setUpMocks();
  });
}

export default function Home() {
  const router = useRouter();
  const { isLogin } = useSelector(selectAuthState);

  const handleStartClick = () => {
    if (isLogin) {
      router.push("/service/map");
    } else {
      router.push("/account/login");
    }
  };

  return (
    <Container>
      <HeroSection>
        <HeroText>
          <Text className="text-xl font-bold text-point text-left">
            안녕하세요!
          </Text>
          <Text className="text-xl font-bold text-point">
            좋은 장소를 찾기를 바랍니다.
          </Text>

          <Gap side={10} />
          <StyledButton
            buttonType="primary"
            text="시작하기"
            onClick={handleStartClick}
          />
        </HeroText>
      </HeroSection>
      <FeatureSection id="features">
        <Features>
          <Feature>
            <StyledText
              text="카카오 데이터로 장소 찾기"
              textAlign="center"
              fontWeight="semiBold"
            />
            <StyledText
              text="최대 상위 32개 장소를 랜덤 추천, 대진표 만들기"
              textAlign="center"
              fontSize="sm"
              fontWeight="regular"
            />
          </Feature>
          <Feature>
            <StyledText
              text="위치 기반"
              textAlign="center"
              fontWeight="semiBold"
            />
            <StyledText
              text="실제 위치를 이용해 장소를 찾아보세요."
              textAlign="center"
              fontSize="sm"
              fontWeight="regular"
            />
          </Feature>
          <Feature>
            <StyledText
              text="조건 설정"
              textAlign="center"
              fontWeight="semiBold"
            />
            <StyledText
              text="카테고리, 거리, 키워드를 설정할 수 있어요."
              textAlign="center"
              fontSize="sm"
              fontWeight="regular"
            />
          </Feature>
        </Features>
      </FeatureSection>
      <Footer>
        <StyledText
          text="&copy; 2024 Mapack. All rights reserved."
          textAlign="center"
          fontSize="xs"
        />
      </Footer>
    </Container>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      store.dispatch(setIsLogin(false));
      console.log("State on server", store.getState());
      return {
        props: {},
      };
    },
);

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.mainColor};
  overflow-y: auto;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background-color: ${colors.mainWhite};
  text-align: center;
`;

const HeroText = styled.div`
  max-width: 600px;
`;

const FeatureSection = styled.section`
  padding: 40px 20px;
  background-color: ${colors.mainWhite};
`;

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Feature = styled.div`
  flex: 0 1 300px;
  margin: 10px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  text-align: center;
`;

const Footer = styled.footer`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 20px;
  background-color: #f8f8f8;
  text-align: center;
`;
