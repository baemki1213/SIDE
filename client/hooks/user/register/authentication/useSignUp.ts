import { createUser } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface SignUpError {
  response: {
    message: any;
    status: number;
    data: {
      message: string;
    };
  };
}

export const useSignUp = (setIsModalOpen: (value: boolean) => void) => {
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
    onSuccess: () => {
      setIsModalOpen(true);
    },
  });

  return { createUserMutate, isLoading, isSuccess, isError, error, reset };
};
