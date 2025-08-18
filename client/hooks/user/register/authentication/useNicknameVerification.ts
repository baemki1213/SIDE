import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { checkNickname } from "@/api/user";

interface NicknameVerificationError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export const useNicknameVerification = (
  setIsNicknameValid: (value: boolean) => void,
  setErrorMessage: (value: any) => void,
) => {
  const {
    mutate: verifyName,
    isLoading,
    isError,
    isSuccess,
  } = useMutation<
    AxiosResponse<any, any>,
    NicknameVerificationError,
    { nickname: string }
  >({
    mutationFn: checkNickname,
    onError: (error: NicknameVerificationError) => {
      const status = error.response.status;
      const message = error.response.data.message;

      if (status === 409) {
        setIsNicknameValid(false);
        setErrorMessage((previousErrorMessage: any) => ({
          ...previousErrorMessage,
          nickname: message,
        }));
      }
      if (status === 500) {
        setIsNicknameValid(false);
        setErrorMessage((previousErrorMessage: any) => ({
          ...previousErrorMessage,
          nickname: message,
        }));
      }
    },
  });

  return { verifyName, isLoading, isError, isSuccess };
};
