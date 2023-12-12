import { render, screen } from "@/utils/test-utils";
import { useAppSelector } from "@/hooks/reduxHook";

import Header from "..";

afterEach(() => {
  jest.clearAllMocks();
});

describe("header component", () => {
  test("Should render correctly when isLogin is false", async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isLogin: false,
    });
    render(<Header />);
    const sidebarIcon = screen.getByTestId("sidebar-icon");
    expect(sidebarIcon).toBeInTheDocument();
    const sidebarBurgerIcon = screen.getByTestId("styledBurgerIcon");
    expect(sidebarBurgerIcon).toBeInTheDocument();
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");
    expect(sidebarTrigger).toBeInTheDocument();
    const sidebarContainer = screen.getByTestId("sidebar-container");
    expect(sidebarContainer).toBeInTheDocument();

    const signUpButton = screen.getByRole("button", { name: "회원가입" });
    expect(signUpButton).toBeInTheDocument();
    const loginButton = screen.getByRole("button", { name: "로그인" });
    expect(loginButton).toBeInTheDocument();
  });

  test("Should render correctly when isLogin is true", async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isLogin: true,
      userInfo: { nickname: "testNickname", profile_image: "testProfile" },
    });
    render(<Header />);

    const nicknameText = screen.getByText(`testNickname님 환영합니다.`);
    expect(nicknameText).toBeInTheDocument();
    const profileImage = screen.getByAltText("profile image");
    expect(profileImage).toBeInTheDocument();
  });

  test("Should render the default avatar correctly when profile is null", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isLogin: true,
      userInfo: { nickname: "배민기", profile_image: null },
    });
    render(<Header />);

    const defaultProfile = screen.getByTestId("header-defaultAvatar");
    expect(defaultProfile).toBeInTheDocument();
  });
});
