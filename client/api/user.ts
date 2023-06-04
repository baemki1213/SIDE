import { requestWithoutAuth } from "@/utils/Axios-utils";

interface ICreateProps {
  data: { username: string; password: string };
}

export const createUser = async ({ data }: ICreateProps) => {
  return await requestWithoutAuth({
    method: "post",
    url: "/user/create/",
    data,
  });
};
