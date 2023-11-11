import React, { FC } from "react";
import * as S from "./styles";

interface IProps {
  isShowing: boolean;
  hide: () => void;
  children: React.ReactNode;
}

const Modal: FC<IProps> = ({ isShowing, hide, children }: IProps) => {
  if (!isShowing) return null;
  else
    return (
      <S.ModalBackdrop isShowing={isShowing} onClick={hide}>
        <S.ModalContainer onClick={e => e.stopPropagation()}>
          <S.CloseButton onClick={hide}>&times;</S.CloseButton>
          {children}
        </S.ModalContainer>
      </S.ModalBackdrop>
    );
};

export default Modal;
