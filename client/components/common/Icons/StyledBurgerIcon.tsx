import styled from "styled-components";

import { colors } from "@/styles/assets";

interface Props {
  handleClick: () => void;
  isOpen: boolean;
}

export const StyledBurgerIcon = ({ handleClick, isOpen }: Props) => {
  return (
    <BurgerIconContainer data-testid="styledBurgerIcon" onClick={handleClick}>
      <BurgerIcon isOpen={isOpen} />
    </BurgerIconContainer>
  );
};

const BurgerIconContainer = styled.div`
  cursor: pointer;
  width: 35px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BurgerIcon = styled.div<{ isOpen: boolean }>`
  position: relative;
  width: 30px;
  height: 2px;
  background-color: ${({ isOpen }) =>
    isOpen ? "transparent" : colors.black47};
  transition: all 0.3s ease;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: ${colors.black47};
    transition: all 0.3s ease;
  }

  &:before {
    top: ${({ isOpen }) => (isOpen ? "0" : "-10px")};
    transform: ${({ isOpen }) => (isOpen ? "rotate(45deg)" : "none")};
  }

  &:after {
    top: ${({ isOpen }) => (isOpen ? "0" : "10px")};
    transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg)" : "none")};
  }
`;
