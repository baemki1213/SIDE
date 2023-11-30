import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { login } from "@/api/user";
import { useAppDispatch } from "@/hooks/reduxHook";

import { showToast } from "@/store/toastSlice";
import { setLoginInfo } from "@/store/authSlice";
import { IUserInfo } from "@/types/user";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data, mutate, isLoading, isError, isSuccess, error, reset } =
    useMutation<
      AxiosResponse<any, any>,
      any,
      { email: string; password: string }
    >({
      mutationFn: login,
      onSuccess: async (res: { data: IUserInfo }) => {
        dispatch(setLoginInfo({ isLogin: true, userInfo: res.data }));
        dispatch(showToast("환영합니당!"));
        router.back();
      },
      onError: err => {
        dispatch(showToast(err.response.data.message));
      },
    });
  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
    data,
  };
};
