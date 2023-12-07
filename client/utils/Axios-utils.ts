import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";

import { instance } from "../api/Core";
import { refreshToken } from "@/api/auth";
import { setAccessToken } from "@/store/authSlice";

interface IRequestOptions {
  method?: "get" | "post" | "patch" | "delete" | "put";
  url?: string;
  data?: any;
  "Content-Type"?: "application/json" | "multipart/form-data";
}

export const requestWithAuth = async (
  { ...options }: IRequestOptions,
  token: string,
  dispatch: Dispatch
) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
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
        dispatch(setAccessToken(newAccessToken.access_token));
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
