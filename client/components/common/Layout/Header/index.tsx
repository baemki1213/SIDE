import * as S from "./styles";

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderLeft>
        <S.HeaderIcon>Sidebar</S.HeaderIcon>
      </S.HeaderLeft>
      <S.HeaderRight>
        <S.HeaderIcon>profile section</S.HeaderIcon>
      </S.HeaderRight>
    </S.HeaderContainer>
  );
};

export default Header;
