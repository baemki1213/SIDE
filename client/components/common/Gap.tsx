import styled from "styled-components";

const Gap = styled.div<{
  side: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
}>`
  width: ${({ side }) => (typeof side === "string" ? side : side + "px")};
  height: ${({ side }) => (typeof side === "string" ? side : side + "px")};
  min-width: ${({ minWidth }) =>
    typeof minWidth === "string" ? minWidth : minWidth + "px"};
  min-height: ${({ minHeight }) =>
    typeof minHeight === "string" ? minHeight : minHeight + "px"};
`;

export default Gap;
