import styled from "styled-components";

export const ModalBackdrop = styled.div<{ isShowing: boolean }>`
  display: ${props => (props.isShowing ? "block" : "none")};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

export const CloseButton = styled.span`
  float: right;
  font-size: 1.5em;
  line-height: 1em;
  cursor: pointer;
`;
