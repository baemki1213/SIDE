import { fireEvent, render, screen, waitFor } from "@/utils/test-utils";
import Sidebar from "..";

describe("sidebar", () => {
  test("Should render correctly", () => {
    render(<Sidebar />);

    const hamburgerIcon = screen.getByTestId("styledBurgerIcon");
    expect(hamburgerIcon).toBeInTheDocument();
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");
    expect(sidebarTrigger).toBeInTheDocument();
  });

  test("Should render container when hover trigger", async () => {
    render(<Sidebar />);
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");
    fireEvent.mouseOver(sidebarTrigger);
    await waitFor(() => {
      const sidebarContainer = screen.getByTestId("sidebar-container");
      expect(sidebarContainer).toBeInTheDocument();
      expect(sidebarContainer).toHaveStyle("top: 80px; left: 0px; opacity: 1;");
    });
    const sidebarMenu1 = screen.getByLabelText("맛집 찾기");
    expect(sidebarMenu1).toBeInTheDocument();
    const sidebarMenu2 = screen.getByLabelText("AI 추천");
    expect(sidebarMenu2).toBeInTheDocument();
    const sidebarMenu3 = screen.getByLabelText("맛집 월드컵");
    expect(sidebarMenu3).toBeInTheDocument();
    const sidebarMenu4 = screen.getByLabelText("나의 기록");
    expect(sidebarMenu4).toBeInTheDocument();
    const sidebarMenu5 = screen.getByLabelText("인기 장소");
    expect(sidebarMenu5).toBeInTheDocument();
    const sidebarMenu6 = screen.getByLabelText("랜덤 추천");
    expect(sidebarMenu6).toBeInTheDocument();
    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    expect(logoutButton).toBeInTheDocument();
    fireEvent.mouseLeave(sidebarTrigger);
    await waitFor(() => {
      const sidebarContainer = screen.getByTestId("sidebar-container");
      expect(sidebarContainer).toBeInTheDocument();
      expect(sidebarContainer).toHaveStyle(
        "opacity: 0; top: 80px; left: -240px;"
      );
    });
  });
  test("Should render fixed container when clicked icon", async () => {
    render(<Sidebar />);
    const hamburgerIcon = screen.getByTestId("styledBurgerIcon");
    fireEvent.click(hamburgerIcon);
    await waitFor(() => {
      const sidebarContainer = screen.getByTestId("sidebar-container");
      expect(sidebarContainer).toBeInTheDocument();
      expect(sidebarContainer).toHaveStyle(
        "top: 0px; max-height: 100vh; left: 0px; opacity: 1;"
      );
    });
    fireEvent.click(hamburgerIcon);
    await waitFor(() => {
      const sidebarContainer = screen.getByTestId("sidebar-container");
      expect(sidebarContainer).toBeInTheDocument();
      expect(sidebarContainer).toHaveStyle(
        "top: 80px; max-height: calc(100vh - 120px); left: -240px; opacity: 0;"
      );
    });
  });

  test("Should handle buttons correctly", async () => {
    render(<Sidebar />);
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");
    fireEvent.mouseOver(sidebarTrigger);
    await waitFor(() => {
      const sidebarContainer = screen.getByTestId("sidebar-container");
      expect(sidebarContainer).toBeInTheDocument();
    });
    const sidebarMenu1 = screen.getByLabelText("맛집 찾기");
    fireEvent.click(sidebarMenu1);
    const sidebarMenu2 = screen.getByLabelText("AI 추천");
    fireEvent.click(sidebarMenu2);
    const sidebarMenu3 = screen.getByLabelText("맛집 월드컵");
    fireEvent.click(sidebarMenu3);
    const sidebarMenu4 = screen.getByLabelText("나의 기록");
    fireEvent.click(sidebarMenu4);
    const sidebarMenu5 = screen.getByLabelText("인기 장소");
    fireEvent.click(sidebarMenu5);
    const sidebarMenu6 = screen.getByLabelText("랜덤 추천");
    fireEvent.click(sidebarMenu6);
    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    fireEvent.click(logoutButton);
  });
});
