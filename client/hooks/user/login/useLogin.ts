import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { useRouter } from "next/router";

import { login } from "@/api/user";
import { dispatch } from "@/store";
import { setLoginInfo } from "@/store/authSlice";
import { showToast } from "@/store/toastSlice";
import { IUserInfo } from "@/types/user";

export const useLogin = () => {
  const router = useRouter();

  const { data, mutate, isPending, isError, isSuccess, error, reset } =
    useMutation<
      AxiosResponse<any, any>,
      any,
      { email: string; password: string }
    >({
      mutationFn: login,
      onSuccess: async (res: {
        data: { user: IUserInfo; access_token: string; refresh_token: string };
      }) => {
        const { user, access_token } = res.data;

        // ✅ 로컬스토리지에 저장해서 requestWithAuth에서 자동 사용되게
        localStorage.setItem("access_token", access_token);

        dispatch(
          setLoginInfo({
            isLogin: true,
            userInfo: user,
          }),
        );
        dispatch(showToast("환영합니다."));
        router.push("/");
      },
      onError: (err) => {
        dispatch(showToast(err.response.data.message));
      },
    });
  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
    data,
  };
};
