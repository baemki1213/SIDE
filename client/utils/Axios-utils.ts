import { AxiosError, AxiosResponse } from "axios";

import { instance } from "../api/Core";
import { refreshToken } from "@/api/auth";

import { dispatch } from "@/store";

interface IRequestOptions {
  method?: "get" | "post" | "patch" | "delete" | "put";
  url?: string;
  data?: any;
  "Content-Type"?: "application/json" | "multipart/form-data";
}

export const requestWithAuth = async (options: IRequestOptions) => {
  const token = localStorage.getItem("access_token"); // ✅ 또는 Redux 상태에서 직접
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  instance.defaults.headers.common["Content-Type"] = "application/json";

  const onSuccess = (res: AxiosResponse<any>) => res?.data;

  const onError = async (err: AxiosError<any>) => {
    if (
      (err.response?.status === 401 &&
        err.response.data === "액세스 토큰이 존재하지 않습니다.") ||
      (err.response?.status === 403 &&
        err.response.data === "유효하지 않은 액세스 토큰")
    ) {
      try {
        const newAccessToken = await refreshToken({});
        instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken.access_token}`;

        localStorage.setItem("access_token", newAccessToken.access_token); // ✅ 추가

        return await instance(options).then(onSuccess);
      } catch (refreshError) {
        throw refreshError;
      }
    }
    throw err;
  };

  return await instance(options).then(onSuccess).catch(onError);
};

export const requestWithoutAuth = async ({ ...options }: IRequestOptions) => {
  delete instance.defaults.headers.common.Authorization;
  instance.defaults.headers.common["Content-Type"] = "application/json";

  const onSuccess = (res: AxiosResponse<any>) => res;
  const onError = (err: AxiosError<any>) => {
    throw err;
  };

  return await instance(options).then(onSuccess).catch(onError);
};

export const requestWithCookie = async ({ ...options }: IRequestOptions) => {
  instance.defaults.withCredentials = true;
  instance.defaults.headers.common["Content-Type"] = "application/json";

  const onSuccess = (res: AxiosResponse<any>) => res?.data;
  const onError = (err: AxiosError<any>) => {
    throw err;
  };

  return await instance(options).then(onSuccess).catch(onError);
};
