import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppDispatch } from "@/hooks/reduxHook";

import { logout } from "@/api/user";
import { clearLoginInfo } from "@/store/authSlice";
import { showToast } from "@/store/toastSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, reset } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(clearLoginInfo());
      dispatch(showToast("로그아웃 되었습니다."));
      queryClient.removeQueries(); // 모든 쿼리 데이터 초기화
    },
    onError: (error: any) => {
      dispatch(clearLoginInfo());
      dispatch(showToast("로그아웃 되었습니다."));
      queryClient.removeQueries(); // 모든 쿼리 데이터 초기화
    },
  });

  return { mutate, isLoading, isError, error, reset };
};
