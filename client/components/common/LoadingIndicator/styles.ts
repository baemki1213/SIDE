import { colors } from "@/styles/assets";
import styled, { keyframes } from "styled-components";

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
  border: 5px solid ${colors.grayEd};
  border-top: 5px solid ${colors.mainColor};
  border-radius: 50%;
  width: ${({ size }) => size || "50px"};
  height: ${({ size }) => size || "50px"};
  animation: ${rotate} 2s linear infinite;
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
