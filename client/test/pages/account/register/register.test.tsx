import RegisterPage from "../../../../pages/account/register";
import { render, screen } from "../../../../utils/test-utils";

describe("Register page", () => {
  test("renders page correctly", async () => {
    render(<RegisterPage />);
    const pageTitleText = screen.getByText("회원가입");
    expect(pageTitleText).toBeInTheDocument();
    const snsInfoText = screen.getByText("SNS계정으로 간편하게 회원가입");
    expect(snsInfoText).toBeInTheDocument();
    const kakaoRegisterBtn = screen.getByRole("button", { name: "kakao" });
    expect(kakaoRegisterBtn).toBeInTheDocument();
    const naverRegisterBtn = screen.getByRole("button", { name: "naver" });
    expect(naverRegisterBtn).toBeInTheDocument();
    const googleRegisterBtn = screen.getByRole("button", { name: "google" });
    expect(googleRegisterBtn).toBeInTheDocument();
    const emailInput = await screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toBeInTheDocument();
    const emailVerifyBtn = await screen.getByRole("button", {
      name: "이메일 인증하기",
    });
    expect(emailVerifyBtn).toBeInTheDocument();

    const passwordTitleText = screen.getByText("비밀번호");
    expect(passwordTitleText).toBeInTheDocument();
    const passwordInput1 = screen.getByLabelText("password1");
    expect(passwordInput1).toBeInTheDocument();
    const passwordInfoText = screen.getByText(
      "영문, 숫자를 포함한 8자리 이상의 비밀번호를 입력해주세요."
    );
    expect(passwordInfoText).toBeInTheDocument();

    const password2TitleText = screen.getByText("비밀번호 확인");
    expect(password2TitleText).toBeInTheDocument();
    const passwordInput2 = screen.getByLabelText("password2");
    expect(passwordInput2).toBeInTheDocument();

    const nickNameTitleText = screen.getByText("닉네임");
    expect(nickNameTitleText).toBeInTheDocument();
    const nickNameInput = screen.getByLabelText("nickname");
    expect(nickNameInput).toBeInTheDocument();
    const nickNameInfoText = screen.getByText(
      "다른 유저와 겹치지 않도록 입력해주세요."
    );
    expect(nickNameInfoText).toBeInTheDocument();

    const signUpBtn = screen.getByRole("button", { name: "회원가입하기" });
    expect(signUpBtn).toBeInTheDocument();

    const alreadyInfoText = screen.getByText("이미 아이디가 있으신가요?");
    expect(alreadyInfoText).toBeInTheDocument();
    const signInBtn = screen.getByText("로그인");
    expect(signInBtn).toBeInTheDocument();
  });
});
