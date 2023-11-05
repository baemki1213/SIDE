import { http, HttpResponse } from "msw";

const authHandlers = [
  // send verifyEmail
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/send-verification-email`,
    () => {
      return HttpResponse.json({
        status: 200,
        data: { message: "이메일을 성공적으로 보냈습니다" },
      });
    }
  ),
  // verifyEmailCode
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email/`,
    async ({ request }: any) => {
      const { email, code } = await request.json();

      if (code === 111111) {
        return HttpResponse.json({
          status: 400,
          data: { message: "만료된 코드입니다." },
        });
      }
      if (code === 222222) {
        return HttpResponse.json({
          status: 400,
          data: { message: "잘못된 코드입니다." },
        });
      }
      if (code === 123456) {
        return HttpResponse.json({
          status: 200,
          data: { message: "이메일이 성공적으로 인증되었습니다!" },
        });
      }

      return HttpResponse.json({
        status: 500,
        data: { message: "Server error" },
      });
    }
  ),
];

export { authHandlers };
