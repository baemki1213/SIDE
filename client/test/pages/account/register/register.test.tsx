import RegisterPage from "../../../../pages/account/register";
import { render, screen } from "../../../../utils/test-utils";

describe("Register page", () => {
  test("renders page correctly", async () => {
    render(<RegisterPage />);
    const pageTitleText = screen.getByText("Sign up");
    expect(pageTitleText).toBeInTheDocument();
    const snsInfoText = screen.getByText(
      "Sign up easily with your SNS account"
    );
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
      name: "Verify Email",
    });
    expect(emailVerifyBtn).toBeInTheDocument();

    const passwordTitleText = screen.getByText("Password");
    expect(passwordTitleText).toBeInTheDocument();
    const passwordInput1 = screen.getByLabelText("password1");
    expect(passwordInput1).toBeInTheDocument();
    const passwordInfoText = screen.getByText(
      "Please enter a password of at least 8 characters, including letters and numbers"
    );
    expect(passwordInfoText).toBeInTheDocument();

    const password2TitleText = screen.getByText("Confirm password");
    expect(password2TitleText).toBeInTheDocument();
    const passwordInput2 = screen.getByLabelText("password2");
    expect(passwordInput2).toBeInTheDocument();

    const nickNameTitleText = screen.getByText("Nickname");
    expect(nickNameTitleText).toBeInTheDocument();
    const nickNameInput = screen.getByLabelText("nickname");
    expect(nickNameInput).toBeInTheDocument();
    const nickNameInfoText = screen.getByText(
      "Please enter a password that does not overlap with other users"
    );
    expect(nickNameInfoText).toBeInTheDocument();

    const signUpBtn = screen.getByRole("button", { name: "Sign up" });
    expect(signUpBtn).toBeInTheDocument();

    const alreadyInfoText = screen.getByText("Do you already have an account?");
    expect(alreadyInfoText).toBeInTheDocument();
    const signInBtn = screen.getByText("Login");
    expect(signInBtn).toBeInTheDocument();
  });
});
