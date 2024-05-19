import React from "react";
import styled from "styled-components";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <LayoutContainer>
      <Header />
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;
