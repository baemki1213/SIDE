import React from "react";
import styled from "styled-components";

import StyledText from "@/components/common/StyledText";

import { colors } from "@/styles/assets";
import Gap from "@/components/common/Gap";

interface InfoWindowContentProps {
  place_name: string;
  categoryName: string;
  road_address_name: string;
  phone?: string;
  place_url?: string;
  closeInfoWindow: () => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({
  place_name,
  road_address_name,
  categoryName,
  phone,
  place_url,
  closeInfoWindow,
}) => {
  return (
    <InfoWindowContainer onClick={closeInfoWindow}>
      <StyledText text={place_name} fontWeight="bold" fontColor="black47" />
      <Gap side={5} />
      <StyledText
        text={categoryName}
        fontSize="xs"
        fontColor="black47"
        fontWeight="regular"
      />
      <Gap side={5} />
      <StyledText
        text={road_address_name}
        fontSize="xs"
        fontColor="gray130"
        fontWeight="regular"
      />
      <StyledText text={phone} fontSize="xs" fontColor="gray130" />
      <Gap side={5} />
      {place_url && (
        <Link href={place_url} target="_blank" rel="noopener noreferrer">
          <StyledText
            text="카카오 맵에서 자세히 보기"
            fontSize="xxs"
            fontColor="pointColor"
            fontWeight="bold"
          />
        </Link>
      )}
    </InfoWindowContainer>
  );
};

export default InfoWindowContent;

const InfoWindowContainer = styled.div`
  padding: 10px;
  width: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${colors.mainWhite};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.pointColor};

  &:hover {
    text-decoration: underline;
  }
`;
