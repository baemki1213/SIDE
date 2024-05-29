// TypeScript를 사용한 MUI 스타일의 그리드 시스템 구현
import React, { ReactNode } from "react";
import styled from "styled-components";

// 컨테이너 스타일 정의
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

// 아이템 스타일 정의
const StyledGridItem = styled.div<{ size: number }>`
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 ${({ size }) => (size / 12) * 100}%;
  max-width: ${({ size }) => (size / 12) * 100}%;
`;

// 그리드 컨테이너 컴포넌트 Props 타입 정의
interface GridProps {
  children: ReactNode;
}

// 그리드 컨테이너 컴포넌트
export const Grid: React.FC<GridProps> = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

// 그리드 아이템 컴포넌트 Props 타입 정의
interface GridItemProps {
  size: number;
  children: ReactNode;
}

// 그리드 아이템 컴포넌트
export const GridItem: React.FC<GridItemProps> = ({ size, children }) => {
  return <StyledGridItem size={size}>{children}</StyledGridItem>;
};
