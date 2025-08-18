import styled from "styled-components";

import { colors } from "@/styles/assets";

export const FilterContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 100;
`;

export const FilterButton = styled.button`
  background-color: ${colors.mainWhite};
  border: none;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
