import { render, screen } from '@testing-library/react';
import TaxCalculator from "..";
import CalculatorHeader from "../../CalculatorHeader";
import CalculatorBody from "../../CalculatorBody";

jest.mock("../../CalculatorHeader");
jest.mock("../../CalculatorBody");

describe("TaxCalculator component", () => {
  test("renders header and body", () => {
    render(<TaxCalculator />);

    expect(CalculatorHeader).toBeCalled();
    expect(CalculatorBody).toBeCalled();
  });

  test("renders error message", () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {})    

    CalculatorHeader.mockImplementation(() => {
      throw new Error({ message: "CalculatorHeader Error" });
    });

    render(<TaxCalculator />);

    expect(screen.getByRole("button", /try again/i)).toBeInTheDocument();

    spy.mockRestore();
  });
});