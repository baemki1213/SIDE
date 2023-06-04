import styled from "styled-components";

import { wrapper } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { selectAuthState, setAuthState } from "@/store/authSlice";
import { decrement, increment } from "@/store/countSlice";
import { createUser } from "@/api";
import { useEffect } from "react";

export default function Home() {
  const { value: count } = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);

  useEffect(() => {
    createUser({ data: { username: "test", password: "1234qwer!" } })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);
  return (
    <Container>
      <div>home</div>
      <div>REDUX</div>
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <button
        onClick={() => {
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true));
        }}
      >
        {authState ? "Logout" : "LogIn"}
      </button>

      <button onClick={() => dispatch(increment())}>increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.mainColor};
`;

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ params }) => {
      store.dispatch(increment());
      store.dispatch(setAuthState(false));
      console.log("State on server", store.getState());
      return {
        props: {},
      };
    }
);
