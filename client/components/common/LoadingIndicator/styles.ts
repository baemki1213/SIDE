import { colors } from "@/styles/assets";
import { ButtonStyleKey } from "@/styles/assets/button";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;
// 개별 점에 대한 스타일
export const Dot = styled.div<{ size?: string; buttonType?: ButtonStyleKey }>`
  width: ${({ size }) => size || "8px"};
  height: ${({ size }) => size || "8px"};
  background-color: ${({ buttonType }) =>
    buttonType === "primary"
      ? colors.grayEd
      : buttonType === "secondary"
      ? colors.mainColor
      : colors.grayEd};
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;
`;

// 세 개의 점이 나란히 배치되는 컨테이너
export const DotsSpinnerContainer = styled.div<{ width?: string }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: ${({ width }) => width || "50px"};

  ${Dot}:nth-child(1) {
    animation-delay: -0.32s;
  }
  ${Dot}:nth-child(2) {
    animation-delay: -0.16s;
  }
  ${Dot}:nth-child(3) {
    animation-delay: 0s;
  }
`;

// 스피너 애니메이션 정의
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 스피너 컴포넌트 스타일링
export const Spinner = styled.div<{ size?: string }>`
  border: 5px solid ${({ theme }) => theme.colors.grayEd};
  border-top: 5px solid ${({ theme }) => theme.colors.pointColor};
  border-radius: 50%;
  width: ${({ size }) => size || "50px"};
  height: ${({ size }) => size || "50px"};
  animation: ${rotate} 2s linear infinite;
`;
export const ComponentSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
// 전체 페이지 커버 스타일링
export const FullPageSpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
`;
