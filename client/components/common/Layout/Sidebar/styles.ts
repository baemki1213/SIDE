import styled from "styled-components";

import { colors } from "@/styles/assets";

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
`;
export const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 50px;
`;
export const SidebarMenu = styled.button`
  display: flex;
  align-items: baseline;
  padding: 0 20px;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  margin-bottom: 15px;
  padding: 0 20px;
`;

export const SidebarTrigger = styled.div`
  width: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`;

export const SidebarIcon = styled.header<{
  isClickOpen: boolean;
}>`
  position: relative;
  left: ${({ isClickOpen }) => (isClickOpen ? "180px" : "0")};
  transition: left 0.3s ease;
  z-index: 122;
`;

export const SidebarContainer = styled.div<{
  isClickOpen: boolean;
  isHoverOpen: boolean;
}>`
  width: 240px;
  height: 100vh;
  max-height: ${({ isClickOpen }) =>
    isClickOpen ? "100vh" : "calc(100vh - 120px)"};
  position: fixed;
  opacity: ${({ isHoverOpen, isClickOpen }) =>
    isClickOpen || isHoverOpen ? 1 : 0};
  top: ${({ isHoverOpen, isClickOpen }) =>
    isClickOpen ? "0" : isHoverOpen ? "80px" : "80px"};
  left: ${({ isClickOpen, isHoverOpen }) =>
    isClickOpen || isHoverOpen ? "0" : "-240px"};
  background-color: ${colors.mainWhite};
  transition: width 270ms ease, opacity 270ms ease, transform 270ms ease,
    left 0.3s ease, top 0.3s ease;
  z-index: 100;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;
