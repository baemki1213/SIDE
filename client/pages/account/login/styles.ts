import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 360px;
  margin: 0 auto;
  padding: 60px 0;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
`;

export { Container, Wrapper, Form };
