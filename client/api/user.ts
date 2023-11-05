import { requestWithoutAuth } from "@/utils/Axios-utils";

interface ICreateProps {
  email: string;
  password: string;
  nickname: string;
}

export const createUser = async (data: ICreateProps) => {
  return await requestWithoutAuth({
    method: "post",
    url: "/user/create/",
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
