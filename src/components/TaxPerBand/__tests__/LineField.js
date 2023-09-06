import { render, screen } from "../../../shared/rtlHelpers";
import LineField from "../LineField";

describe("LineField component", () => {
  test("renders a number with currency and operator", () => {
    render(<LineField value={1000} operator="+" />);

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  test("renders a number with % unit and operator", () => {
    render(<LineField value={0.25} operator="x" isRate />);

    expect(screen.getByText("25%")).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
  });

  test("renders a number without operator", () => {
    render(<LineField value={1000} />);

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.queryByText("=")).not.toBeInTheDocument();
  });   
});