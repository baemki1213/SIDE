import styled from "styled-components";

import { colors } from "@/styles/assets";

export const HeaderContainer = styled.header`
  background-color: ${colors.mainWhite};
  width: 100%;
  max-width: 100vw;
  z-index: 100;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 45px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderIcon = styled.div`
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
