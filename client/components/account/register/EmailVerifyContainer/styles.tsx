import styled from "styled-components";

import { colors } from "@/styles/assets";

export const Container = styled.div`
  box-sizing: border-box;
  padding: 20px 16px;
  margin-bottom: 30px;
  background-color: ${colors.grayDisabledBack};
`;

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const FooterTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextButton = styled.button``;
