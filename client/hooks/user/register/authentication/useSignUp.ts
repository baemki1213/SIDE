import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { createUser } from "@/api/user";

interface SignUpError {
  response: {
    message: any;
    status: number;
    data: {
      message: string;
    };
  };
}

interface Props {
  onSuccess: () => void;
  onError: (error: SignUpError) => void;
}

export const useSignUp = ({ onSuccess, onError }: Props) => {
  const {
    mutate: createUserMutate,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation<
    AxiosResponse<any, any>,
    SignUpError,
    { email: string; password: string; nickname: string }
  >({
    mutationFn: createUser,
    onSuccess,
    onError,
  });

  return { createUserMutate, isLoading, isSuccess, isError, error, reset };
};
