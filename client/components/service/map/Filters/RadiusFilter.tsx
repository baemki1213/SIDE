import styled from "styled-components";

import StyledButton from "@/components/common/StyledButton";
import StyledText from "@/components/common/StyledText";
import { Dispatch, SetStateAction } from "react";
import Gap from "@/components/common/Gap";

interface Props {
  radius: number;
  setRadius: Dispatch<SetStateAction<number>>;
}

const RadiusFilter = ({ radius, setRadius }: Props) => {
  const radiusOptions = [250, 500, 1000, 1500, 2000, Infinity];

  const handleRadiusButtonClick = (radius: number) => {
    setRadius(radius);
  };

  return (
    <RadiusFilterContainer>
      <Gap side={10} />
      <StyledText
        text="거리"
        fontColor="pointColor"
        fontWeight="bold"
        fontSize="lg"
      />
      <RadiusFilterWrapper>
        {radiusOptions.map((option, index) => (
          <StyledButton
            key={index}
            text={`${option === Infinity ? "무제한" : `${option}m`}`}
            width="70px"
            borderRadius="30px"
            onClick={() => handleRadiusButtonClick(option)}
            buttonType={radius === option ? "primary" : "secondary"}
          />
        ))}
      </RadiusFilterWrapper>
    </RadiusFilterContainer>
  );
};

export default RadiusFilter;

const RadiusFilterContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const RadiusFilterWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
`;
