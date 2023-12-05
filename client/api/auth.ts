import { requestWithoutAuth } from "@/utils/Axios-utils";

export const refreshToken = async (data: any) => {
  return await requestWithoutAuth({
    method: "post",
    url: "/auth/token/refresh",
    data,
  });
};
