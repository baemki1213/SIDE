import { ChangeEvent, Dispatch, SetStateAction } from "react";

import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";

import { FilterInfo } from "@/types/map";

import * as S from "./styles";

interface Props {
  filterInfo: FilterInfo;
  setFilterInfo: Dispatch<SetStateAction<FilterInfo>>;
}

const QueryFilter = ({ filterInfo, setFilterInfo }: Props) => {
  const handleKeywordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const query = e.target.value;

    setFilterInfo((prev) => ({ ...prev, query }));
  };

  return (
    <S.FilterContainer>
      <StyledText
        text="키워드 (선택사항)"
        fontColor="black47"
        fontWeight="semiBold"
        fontSize="lg"
      />
      <S.FilterWrapper>
        <TextInput
          name="query"
          infoText="찾고 싶은 장소를 알려주세요!"
          value={filterInfo.query}
          onChange={handleKeywordChange}
          placeholder="예: 한식, 떡볶이, 24시 운영, 호텔, 어린이 놀이터 등"
        />
      </S.FilterWrapper>
    </S.FilterContainer>
  );
};

export default QueryFilter;
