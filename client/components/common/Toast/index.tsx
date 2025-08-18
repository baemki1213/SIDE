import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { hideToast } from "@/store/toastSlice";

import StyledText from "../StyledText";
import * as S from "./styles";

const ToastComponent = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (toast.isVisible) {
      setTimeout(() => {
        dispatch(hideToast());
      }, 3000); // Auto-hide after 3 seconds
    }
  }, [toast, dispatch]);

  if (!toast.isVisible) return null;

  return (
    <S.Toast>
      <StyledText
        text={toast.message}
        fontColor="mainWhite"
        fontWeight="semiBold"
      />
    </S.Toast>
  );
};

export default ToastComponent;
