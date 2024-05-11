import { ChangeEvent, Dispatch, SetStateAction } from "react";

import * as S from "./styles";
import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";

import { FilterInfo } from "@/types/map";

interface Props {
  filterInfo: FilterInfo;
  setFilterInfo: Dispatch<SetStateAction<FilterInfo>>;
}

const QueryFilter = ({ filterInfo, setFilterInfo }: Props) => {
  const handleKeywordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const query = e.target.value;

    setFilterInfo(prev => ({ ...prev, query }));
  };

  return (
    <S.FilterContainer>
      <StyledText
        text="Keyword(Optional)"
        fontColor="black47"
        fontWeight="semiBold"
        fontSize="lg"
      />
      <S.FilterWrapper>
        <TextInput
          name="query"
          infoText="찾고 싶은 장소의 키워드를 입력해 주세요."
          value={filterInfo.query}
          onChange={handleKeywordChange}
          placeholder="예: 매운 음식, 중식, 한식, 호텔, 공부하기 좋은... 기타 등등"
        />
      </S.FilterWrapper>
    </S.FilterContainer>
  );
};

export default QueryFilter;
