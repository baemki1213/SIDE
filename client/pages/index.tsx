import styled from "styled-components";

import { wrapper } from "@/store";
import { selectAuthState, setIsLogin } from "@/store/authSlice";
import { useSelector } from "react-redux";

export default function Home() {
  const { isLogin } = useSelector(selectAuthState);

  return <Container></Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.mainColor};
`;

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ params }) => {
      store.dispatch(setIsLogin(false));
      console.log("State on server", store.getState());
      return {
        props: {},
      };
    }
);
