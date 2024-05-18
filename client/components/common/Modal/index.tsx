import React, { FC } from "react";
import * as S from "./styles";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { closeModal, selectModalState } from "@/store/modalSlice";

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, children } = useAppSelector(selectModalState);

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!isModalOpen) return null;
  else
    return (
      <S.ModalBackdrop isShowing={isModalOpen} onClick={handleClose}>
        <S.ModalContainer onClick={e => e.stopPropagation()}>
          <S.CloseButton onClick={handleClose}>&times;</S.CloseButton>
          {children}
        </S.ModalContainer>
      </S.ModalBackdrop>
    );
};

export default Modal;
