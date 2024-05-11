import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import * as S from "./styles";
import StyledButton from "@/components/common/StyledButton";
import StyledText from "@/components/common/StyledText";
import Gap from "@/components/common/Gap";

import { FilterInfo } from "@/types/map";

interface Props {
  filterInfo: FilterInfo;
  setFilterInfo: Dispatch<SetStateAction<FilterInfo>>;
}

const radiusOptions = [250, 500, 1000, 1500, 2000, 99999999];

const RadiusFilter = ({ filterInfo, setFilterInfo }: Props) => {
  const handleRadiusButtonClick = (radius: number) => {
    setFilterInfo(prev => ({ ...prev, radius }));
  };

  return (
    <S.FilterContainer>
      <StyledText text="Distance" fontColor="black47" fontWeight="semiBold" />
      <S.FilterWrapper>
        {radiusOptions.map((option, index) => (
          <StyledButton
            key={index}
            text={`${option === 99999999 ? "최대" : `${option}m`}`}
            width="80px"
            size="small"
            borderRadius="25px"
            onClick={() => handleRadiusButtonClick(option)}
            buttonType={filterInfo.radius === option ? "primary" : "secondary"}
            opacity={filterInfo.radius === option ? 1 : 0.7}
          />
        ))}
      </S.FilterWrapper>
    </S.FilterContainer>
  );
};

export default RadiusFilter;
