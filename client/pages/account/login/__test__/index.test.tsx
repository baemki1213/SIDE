import {
  fireEvent,
  mockConsoleError,
  render,
  screen,
} from "@/utils/test-utils";
import LoginPage from "..";
import { colors } from "@/styles/assets";

describe("Login page", () => {
  mockConsoleError();
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render the login page correctly", async () => {
    render(<LoginPage />);

    const logoText = screen.getByTestId("text-logo");
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
    const footerContainer = screen.getByTestId("container-footer");
    expect(footerContainer).toBeInTheDocument();
  });
  test("Should reject invalid email formats", async () => {
    const emailInput = screen.getByPlaceholderText("이메일");
    fireEvent.change(emailInput, { target: { value: "email" } });
    expect(emailInput).toHaveStyle(`color: ${colors.redFF}`);
  });
  test("Should clear password inputs after click signIn button", async () => {});
  test("Should show success message on successful login", async () => {});
  test("Should show error message on failed login", async () => {});
  test("Should display error message on server error", async () => {});
  test("Should disable login button during loading", async () => {});
  test("Should clear inputs after successful login", async () => {});
});
