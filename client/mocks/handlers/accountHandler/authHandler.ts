import { http, HttpResponse } from "msw";

const authHandlers = [
  // send verifyEmail
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/send-verification-email`,
    () => {
      return HttpResponse.json({
        status: 200,
        data: { message: "success" },
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
          data: { message: "Expired code" },
        });
      }
      if (code === 222222) {
        return HttpResponse.json({
          status: 400,
          data: { message: "Invalid code" },
        });
      }
      if (code === 123456) {
        return HttpResponse.json({
          status: 200,
          data: { message: "Email verified successfully!" },
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
