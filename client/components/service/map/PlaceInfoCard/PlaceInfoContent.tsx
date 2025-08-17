import styled from "styled-components";

import Gap from "@/components/common/Gap";
import StyledText from "@/components/common/StyledText";

import { colors } from "@/styles/assets";
import { PlaceInfo } from "@/types/map";
import { getLastCategory } from "@/utils/string";

interface Props {
  place: PlaceInfo;
}

const PlaceInfoContent = ({ place }: Props) => {
  return (
    <>
      <StyledText text="미리보기" />
      <Gap side={5} />
      <IframeWrapper>
        <Iframe src={place.place_url} allowFullScreen />
      </IframeWrapper>
      <Gap side={5} />
      <StyledText
        text={place.place_name}
        fontWeight="bold"
        fontColor="black47"
        numberOfLines={1}
      />
      <Gap side={5} />
      <StyledText
        text={getLastCategory(place.category_name)}
        fontSize="xs"
        fontColor="black47"
        fontWeight="regular"
        numberOfLines={1}
      />
      <Gap side={5} />
      <StyledText
        text={place.road_address_name}
        fontSize="xs"
        fontColor="gray130"
        fontWeight="regular"
        numberOfLines={1}
      />
      <StyledText
        text={place.phone ? place.phone : "-"}
        fontSize="xs"
        fontColor="gray130"
        numberOfLines={1}
      />
      <Gap side={5} />
      {place.place_url && (
        <Link href={place.place_url} target="_blank" rel="noopener noreferrer">
          <StyledText
            text="카카오 맵에서 자세히 보기"
            fontSize="xs"
            fontColor="pointColor"
            fontWeight="bold"
            numberOfLines={1}
          />
        </Link>
      )}
    </>
  );
};

export default PlaceInfoContent;

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.pointColor};

  &:hover {
    text-decoration: underline;
  }
`;

const IframeWrapper = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid ${colors.grayDisabledColor};
  cursor: pointer;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
`;
