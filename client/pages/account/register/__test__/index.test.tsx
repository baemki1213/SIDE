import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../../../utils/test-utils";

import RegisterPage from "../index";

describe("Register page", () => {
  test("renders page correctly", async () => {
    render(<RegisterPage />);
    const pageTitleText = screen.getByText("회원가입");
    expect(pageTitleText).toBeInTheDocument();
    // const snsInfoText = screen.getByText("SNS계정으로 간편가입");
    // expect(snsInfoText).toBeInTheDocument();
    // const kakaoRegisterBtn = screen.getByRole("button", { name: "kakao" });
    // expect(kakaoRegisterBtn).toBeInTheDocument();
    // const naverRegisterBtn = screen.getByRole("button", { name: "naver" });
    // expect(naverRegisterBtn).toBeInTheDocument();
    // const googleRegisterBtn = screen.getByRole("button", { name: "google" });
    // expect(googleRegisterBtn).toBeInTheDocument();
    const emailInput = await screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toBeInTheDocument();
    const emailVerifyBtn = await screen.getByRole("button", {
      name: "이메일 인증하기",
    });
    expect(emailVerifyBtn).toBeInTheDocument();

    const passwordTitleText = screen.getByText("비밀번호");
    expect(passwordTitleText).toBeInTheDocument();
    const passwordInput1 = screen.getByLabelText("password");
    expect(passwordInput1).toBeInTheDocument();
    const passwordInfoText = screen.getByText(
      "대문자, 소문자, 숫자, 특수문자 포함 8자 이상"
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
      "다른 유저와 겹치지 않도록 입력해주세요. (2~10자)"
    );
    expect(nickNameInfoText).toBeInTheDocument();

    const signUpBtn = screen.getByRole("button", { name: "회원가입하기" });
    expect(signUpBtn).toBeInTheDocument();

    const alreadyInfoText = screen.getByText("이미 아이디가 있다면?");
    expect(alreadyInfoText).toBeInTheDocument();
    const signInBtn = screen.getByText("로그인");
    expect(signInBtn).toBeInTheDocument();
  });

  test("email verify success", async () => {
    render(<RegisterPage />);

    await waitFor(async () => {
      const emailInput = await screen.getByRole("textbox", { name: /email/i });
      fireEvent.change(emailInput, {
        target: { value: "baemki1213@gmail.com" },
      });
    });
    await waitFor(async () => {
      const emailVerifyBtn = await screen.getByRole("button", {
        name: "이메일 인증하기",
      });
      fireEvent.click(emailVerifyBtn);
    });
    const emailContainerTitle = screen.getByText(
      "이메일로 전송된 인증코드를 입력해주세요."
    );
    expect(emailContainerTitle).toBeInTheDocument();
    const verifyInfoText = screen.getByText("이메일을 받지 못하셨나요?");
    expect(verifyInfoText).toBeInTheDocument();
    const reSendText = screen.getByText("이메일 재전송하기");
    expect(reSendText).toBeInTheDocument();
    await waitFor(() => {
      const verifyCodeInput =
        screen.getByPlaceholderText("인증코드 6자리 입력");
      fireEvent.change(verifyCodeInput, { target: { value: "123456" } });
    });
    await waitFor(() => {
      const emailConfirmBtn = screen.getByRole("button", { name: "확인" });
      fireEvent.click(emailConfirmBtn);
    });

    await waitFor(async () => {
      const emailVerifiedButton = await screen.getByRole("button", {
        name: "이메일 인증 완료",
      });
      expect(emailVerifiedButton).toBeInTheDocument();
      expect(emailVerifiedButton).toBeDisabled();
      // 인증 container 없어짐.
      expect(emailContainerTitle).not.toBeInTheDocument();
    });
  });

  test("nickname check", async () => {
    render(<RegisterPage />);

    const nickNameInput = screen.getByLabelText("nickname");
    fireEvent.change(nickNameInput, { target: { value: "valid" } });

    await waitFor(() => {
      const nickNameButton = screen.getByRole("button", { name: "중복확인" });
      expect(nickNameButton).toBeInTheDocument();
      fireEvent.click(nickNameButton);
    });
  });
});
