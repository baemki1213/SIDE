import React, { FC } from "react";
import * as S from "./styles";
import StyledButton from "../StyledButton";

interface IProps {
  isShowing: boolean;
  hide: () => void;
  children: React.ReactNode;
  closeHandler?: () => void;
  confirmHandler?: () => void;
}

const Modal: FC<IProps> = ({
  isShowing,
  hide,
  children,
  closeHandler,
  confirmHandler,
}: IProps) => {
  if (!isShowing) return null;
  else
    return (
      <S.ModalBackdrop isShowing={isShowing} onClick={hide}>
        <S.ModalContainer onClick={e => e.stopPropagation()}>
          <S.CloseButton onClick={hide}>&times;</S.CloseButton>
          {children}
          <S.ModalFooter>
            {closeHandler && (
              <StyledButton
                size="small"
                buttonType="secondary"
                onClick={closeHandler}
                text="취소"
              />
            )}
            {confirmHandler && (
              <StyledButton
                size="small"
                buttonType="primary"
                onClick={confirmHandler}
                text="확인"
              />
            )}
          </S.ModalFooter>
        </S.ModalContainer>
      </S.ModalBackdrop>
    );
};

export default Modal;
