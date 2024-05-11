import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import StyledButton from "@/components/common/StyledButton";
import StyledText from "@/components/common/StyledText";
import Gap from "@/components/common/Gap";

import { FilterInfo } from "@/types/map";

interface Props {
  filterInfo: FilterInfo;
  setFilterInfo: Dispatch<SetStateAction<FilterInfo>>;
}

const RadiusFilter = ({ filterInfo, setFilterInfo }: Props) => {
  const radiusOptions = [250, 500, 1000, 1500, 2000, 99999999];

  const handleRadiusButtonClick = (radius: number) => {
    setFilterInfo(prev => ({ ...prev, radius }));
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
            text={`${option === 99999999 ? "무제한" : `${option}m`}`}
            width="70px"
            borderRadius="30px"
            onClick={() => handleRadiusButtonClick(option)}
            buttonType={filterInfo.radius === option ? "primary" : "secondary"}
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
