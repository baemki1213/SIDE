import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from { bottom: -100%; }
  to { bottom: 0; }
`;

export const BottomSheetBackdrop = styled.div<{ isShowing: boolean }>`
  display: ${props => (props.isShowing ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomSheet = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  height: 50%; // 바텀시트 높이 설정
  overflow: auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  animation: ${slideUp} 0.3s ease-out; // 슬라이드 업 애니메이션 적용
  z-index: 100;
`;

// 닫기 버튼 스타일
export const BottomSheetCloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px; // 버튼 크기 조절
`;
