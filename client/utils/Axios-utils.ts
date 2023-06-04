import { AxiosError, AxiosResponse } from "axios";
import { instance } from "../api/Core";

interface IRequestOptions {
  method?: "get" | "post" | "patch" | "delete" | "put";
  url?: string;
  data?: any;
  "Content-Type"?: "application/json" | "multipart/form-data";
}

export const requestWithAuth = async (
  { ...options }: IRequestOptions,
  token: string
) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  instance.defaults.headers.common["Content-Type"] = "application/json";

  const onSuccess = (res: AxiosResponse<any>) => res?.data;
  const onError = (err: AxiosError<any>) => {
    throw err;
  };

  return await instance(options).then(onSuccess).catch(onError);
};

export const requestWithoutAuth = async ({ ...options }: IRequestOptions) => {
  delete instance.defaults.headers.common.Authorization;
  instance.defaults.headers.common["Content-Type"] = "application/json";

  const onSuccess = (res: AxiosResponse<any>) => res?.data;
  const onError = (err: AxiosError<any>) => {
    throw err;
  };

  return await instance(options).then(onSuccess).catch(onError);
};
