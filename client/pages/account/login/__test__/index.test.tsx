import { useRouter } from "next/router";
import {
  fireEvent,
  mockConsoleError,
  render,
  screen,
  waitFor,
} from "@/utils/test-utils";

import LoginPage from "..";

import { instance } from "@/api/Core";
import { showToast } from "@/store/toastSlice";

jest.mock("../../../../store/toastSlice.ts", () => ({
  ...jest.requireActual("../../../../store/toastSlice.ts"),
  showToast: jest.fn(),
}));

describe("Login page", () => {
  const router = useRouter();
  mockConsoleError();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render the login page correctly", async () => {
    render(<LoginPage />);

    const logoText = screen.getByTestId("logo-container");
    expect(logoText).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText("이메일");
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    expect(passwordInput).toBeInTheDocument();
    const signInButton = screen.getByRole("button", { name: "로그인" });
    expect(signInButton).toBeInTheDocument();
    const resetButton = screen.getByRole("button", { name: "비밀번호 재설정" });
    expect(resetButton).toBeInTheDocument();
    const signUpButton = screen.getByRole("button", { name: "회원가입" });
    expect(signUpButton).toBeInTheDocument();
    // const socialSignInButton = screen.getByTestId()
    const footerContainer = screen.getByTestId("form-footer");
    expect(footerContainer).toBeInTheDocument();
  });
  test("Should reject invalid email formats", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("이메일");
    fireEvent.change(emailInput, { target: { value: "email" } });
    expect(emailInput).toHaveStyle("color: colors.redff");
    const inValidEmailText =
      screen.getByText("이메일 형식이 올바르지 않습니다.");
    expect(inValidEmailText).toBeInTheDocument();
  });
  test("Should clear password inputs after click signIn button", async () => {
    render(<LoginPage />);
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    expect(passwordInput).toHaveValue("");
  });
  test("Should navigate main page on successful login", async () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText("이메일");
    fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(passwordInput, { target: { value: "1234Qwer!@" } });
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    await waitFor(async () => {
      expect(showToast).toHaveBeenCalledWith("환영합니당!");
      expect(router.push).toHaveBeenCalledWith("/main");
    });
  });
  test("Should show error message on failed login", async () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText("이메일");
    fireEvent.change(emailInput, { target: { value: "invalid@email.com" } });
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(passwordInput, {
      target: { value: "invalidPassword!@12" },
    });
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith(
        "아이디 혹은 비밀번호를 확인해주세요."
      );
    });
  });
  test("Should display error message on server error", async () => {
    instance.defaults.headers.common["X-Use-Mock-Error"] = true;
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText("이메일");
    fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(passwordInput, { target: { value: "1234Qwer!@" } });
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith(
        "서버 에러...! 잠시후 다시 시도해주세요."
      );
    });
  });

  test("Should disable login button during loading", async () => {
    render(<LoginPage />);
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    expect(signInButton).toBeDisabled();
  });

  test("Should push register page when sign up button click", async () => {
    render(<LoginPage />);
    const signUpButton = screen.getByRole("button", { name: "회원가입" });
    fireEvent.click(signUpButton);
    expect(router.push).toHaveBeenCalledWith("/account/register");
  });
  test("Should push reset page when password reset button click", async () => {
    render(<LoginPage />);
    const resetButton = screen.getByRole("button", { name: "비밀번호 재설정" });
    fireEvent.click(resetButton);
    expect(router.push).toHaveBeenCalledWith("/account/reset");
  });
});
