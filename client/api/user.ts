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
