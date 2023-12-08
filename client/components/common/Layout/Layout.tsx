import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Header />
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
`;

const Content = styled.div``;
