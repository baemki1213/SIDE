import RegisterPage from "../../../../pages/account/register";
import { render, screen } from "../../../../utils/test-utils";

describe("Register page", () => {
  test("renders page correctly", () => {
    render(<RegisterPage />);
    const titleElement = screen.getByText("O.D");
    expect(titleElement).toBe(true);
  });
});
