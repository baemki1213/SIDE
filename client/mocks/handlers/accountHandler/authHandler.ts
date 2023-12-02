import { http, HttpResponse } from "msw";

const authHandlers = [
  // send verifyEmail
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/send-verification-email`,
    () => {
      return HttpResponse.json(
        { message: "이메일을 성공적으로 보냈습니다" },
        {
          status: 200,
        }
      );
    }
  ),
  // verifyEmailCode
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email/`,
    async ({ request }: any) => {
      const { email, code } = await request.json();

      if (code === 111111) {
        return HttpResponse.json(
          { message: "만료된 코드입니다." },
          {
            status: 400,
          }
        );
      }
      if (code === 222222) {
        return HttpResponse.json(
          { message: "잘못된 코드입니다." },
          {
            status: 400,
          }
        );
      }
      if (code === 123456) {
        return HttpResponse.json(
          { message: "이메일이 성공적으로 인증되었습니다!" },
          {
            status: 200,
          }
        );
      }

      return HttpResponse.json(
        { message: "Server error" },
        {
          status: 500,
        }
      );
    }
  ),
  // nickname check
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/check-nickname/`,
    async ({ request }: any) => {
      const { nickname } = await request.json();
      if (nickname === "valid") {
        return HttpResponse.json(
          { message: "사용 가능한 닉네임입니다." },
          {
            status: 200,
          }
        );
      }
      if (nickname === "existed") {
        return HttpResponse.json(
          { message: "닉네임이 이미 사용 중입니다." },
          {
            status: 409,
          }
        );
      }
      return HttpResponse.json(
        { message: "Server error" },
        {
          status: 500,
        }
      );
    }
  ),
  // login
  http.post<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/login/`,
    async ({ request }: any) => {
      const { password, email } = await request.json();
      if (request.headers.get("x-use-mock-error")) {
        return HttpResponse.json(
          { message: "서버 에러...! 잠시후 다시 시도해주세요." },
          {
            status: 500,
          }
        );
      }
      if (email === "invalid@email.com" || password === "invalidPassword!@12") {
        return HttpResponse.json(
          { message: "아이디 혹은 비밀번호를 확인해주세요." },
          {
            status: 401,
          }
        );
      }
      if (email === "unregistered@email.com") {
        return HttpResponse.json(
          { message: "없는 유저입니다." },
          { status: 404 }
        );
      }
      if (email === "valid@email.com" && password === "1234Qwer!@") {
        return HttpResponse.json(
          {
            user: { id: 1, email, nickname: "validNickname" },
            access_token: "valid_access_token",
            refresh_token: "valid_refresh_token",
          },
          { status: 200 }
        );
      }
    }
  ),
];

export { authHandlers };
