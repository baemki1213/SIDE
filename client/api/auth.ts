import { requestWithCookie } from "@/utils/Axios-utils";

export const refreshToken = async (data: any) => {
  return await requestWithCookie({
    method: "post",
    url: "/auth/token/refresh",
    data,
  });
};
