import {
  requestWithAuth,
  requestWithCookie,
  requestWithoutAuth,
} from "@/utils/Axios-utils";

interface ICreateProps {
  email: string;
  password: string;
  nickname: string;
}

export const createUser = async (data: ICreateProps) => {
  return await requestWithoutAuth({
    method: "post",
    url: "/user/register/",
    data,
  });
};

export const sendVerificationEmail = async (data: { email: string }) => {
  return await requestWithoutAuth({
    method: "post",
    url: "/user/send-verification-email/",
    data,
  });
};

export const verifyEmailCode = async (data: {
  email: string;
  code: number;
}) => {
  return await requestWithoutAuth({
    method: "post",
    url: "/user/verify-email/",
    data,
  });
};

export const checkNickname = async (data: { nickname: string }) => {
  return await requestWithoutAuth({
    method: "post",
    url: "/user/check-nickname/",
    data,
  });
};

export const login = async (data: { email: string; password: string }) => {
  return await requestWithoutAuth({
    method: "post",
    url: "/user/login/",
    data,
  });
};

export const logout = async (data: any) => {
  return await requestWithCookie({
    method: "post",
    url: "/user/logout/",
    data,
  });
};

export const getUserInfo = async (data: {}, token: string, dispatch: any) => {
  return await requestWithAuth(
    {
      method: "get",
      url: "/user/user-info/",
      data,
    },
    token,
    dispatch
  );
};
