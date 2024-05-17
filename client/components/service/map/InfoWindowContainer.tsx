import React from "react";
import styled from "styled-components";

import StyledText from "@/components/common/StyledText";

import { colors } from "@/styles/assets";

interface InfoWindowContentProps {
  place_name: string;
  road_address_name: string;
  phone?: string;
  place_url?: string;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({
  place_name,
  road_address_name,
  phone,
  place_url,
}) => {
  return (
    <InfoWindowContainer>
      <StyledText text={place_name} />
      <StyledText text={road_address_name} />
      <StyledText text={phone} />

      {place_url && (
        <Link href={place_url} target="_blank" rel="noopener noreferrer">
          자세히 보기
        </Link>
      )}
    </InfoWindowContainer>
  );
};

export default InfoWindowContent;

const InfoWindowContainer = styled.div`
  padding: 10px;
  height: 100px;
  width: 250px;
  background-color: ${colors.mainWhite};
`;

const Link = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
