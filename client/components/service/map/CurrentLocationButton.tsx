import { FaMapMarkerAlt } from "react-icons/fa";

import styled from "styled-components";

import { colors } from "@/styles/assets";

interface Props {
  handleCurrentLocationClick: () => void;
}

const CurrentLocationButton = ({ handleCurrentLocationClick }: Props) => {
  return (
    <Container>
      <Button onClick={handleCurrentLocationClick}>
        <FaMapMarkerAlt />
      </Button>
    </Container>
  );
};

export default CurrentLocationButton;

const Container = styled.div`
  position: fixed;
  bottom: 55px;
  right: 10px;
  z-index: 100;
`;

const Button = styled.button`
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
