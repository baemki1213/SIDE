import { colors } from "@/styles/assets";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px 60px;
  overflow: hidden;
  height: 100%;
`;

export const PlacesContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow: auto;
  height: calc(100vh - 160px);
  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: auto; /* 768px 이하일 때 세로 스크롤 */
    align-items: center;
  }
`;

export const DateGroup = styled.div`
  margin-bottom: 15px;
`;

export const PlaceCard = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: ${colors.pointColor};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: ${colors.grayDisabledColor};
    cursor: not-allowed;
  }
`;

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.pointColor};

  &:hover {
    text-decoration: underline;
  }
`;
