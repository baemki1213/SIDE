import styled from "styled-components";

import { colors } from "@/styles/assets";

export const HeaderContainer = styled.header`
  background-color: ${colors.mainWhite};
  max-width: 100vw;
  z-index: 100;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  min-height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

export const HeaderColumn = styled.div`
  width: 2px;
  height: 22px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: ${colors.black47};
`;

export const HeaderDefaultAvatar = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.pointColor};
  margin-right: 10px;
`;
export const HeaderAvatar = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: ${colors.pointColor};
  margin-right: 10px;
  object-fit: cover;
`;

export const HeaderIcon = styled.div<{ width?: number }>`
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || 45}px;
  height: 45px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
