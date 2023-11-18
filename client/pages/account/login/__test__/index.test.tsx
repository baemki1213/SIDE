import {
  fireEvent,
  mockConsoleError,
  render,
  screen,
  waitFor,
} from "@/utils/test-utils";
import LoginPage from "..";
import { instance } from "@/api/Core";

describe("Login page", () => {
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
  test("Should show success message on successful login", async () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText("이메일");
    fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(passwordInput, { target: { value: "1234Qwer!@" } });
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    const successMessage = screen.getByText("안녕하세요!");
    expect(successMessage).toBeInTheDocument();
    await waitFor(() => {
      const mainPageTitle = screen.getByText("main");
      expect(mainPageTitle).toBeInTheDocument();
    });
  });
  test("Should show error message on failed login", async () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText("이메일");
    fireEvent.change(emailInput, { target: { value: "invalid@email.com" } });
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(passwordInput, { target: { value: "1234qwer!@" } });
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    const failMessage = screen.getByText(
      "아이디 혹은 비밀번호를 확인해주세요."
    );
    expect(failMessage).toBeInTheDocument();
  });
  test("Should display error message on server error", async () => {
    instance.defaults.headers.common["X-Use-Mock-Error"] = true;
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText("이메일");
    fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(passwordInput, { target: { value: "1234qwer!@" } });
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    const serverErrorText = screen.getByText(
      "서버 에러...! 잠시후 다시 시도해주세요."
    );
    expect(serverErrorText).toBeInTheDocument();
  });
  test("Should disable login button during loading", async () => {
    render(<LoginPage />);
    const signInButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(signInButton);
    expect(signInButton).toBeDisabled();
  });
});
