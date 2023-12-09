import Sidebar from "../Sidebar";

import * as S from "./styles";

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderLeft>
        <Sidebar />
      </S.HeaderLeft>
      <S.HeaderRight>
        <S.HeaderIcon>profile section</S.HeaderIcon>
      </S.HeaderRight>
    </S.HeaderContainer>
  );
};

export default Header;
