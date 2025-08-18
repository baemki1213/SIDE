import { Dispatch, SetStateAction } from "react";

import StyledButton from "@/components/common/StyledButton";
import Text from "@/components/common/Text";

import { FilterInfo } from "@/types/map";

import * as S from "./styles";

interface Props {
  filterInfo: FilterInfo;
  setFilterInfo: Dispatch<SetStateAction<FilterInfo>>;
}

const radiusOptions = [250, 500, 1000, 1500, 2000, 20000];

const RadiusFilter = ({ filterInfo, setFilterInfo }: Props) => {
  const handleRadiusButtonClick = (radius: number) => {
    setFilterInfo((prev) => ({ ...prev, radius }));
  };

  return (
    <S.FilterContainer>
      <Text className="text-black-47 text-lg font-semibold">거리</Text>
      <S.FilterWrapper>
        {radiusOptions.map((option, index) => (
          <StyledButton
            key={index}
            text={`${option === 20000 ? "최대" : `${option}m`}`}
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
