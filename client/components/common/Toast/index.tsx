import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { hideToast } from "@/store/toastSlice";

import Text from "../Text";
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
      <Text className="text-white text-base font-semibold">
        {toast.message}
      </Text>
    </S.Toast>
  );
};

export default ToastComponent;
