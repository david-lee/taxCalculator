import axios from "axios";
import CalculatorHeader from "..";
import { act, render, screen, fireEvent } from "../../../shared/rtlHelpers";

jest.mock("axios");

describe("CalculatorHeader component", () => {
  let mockLoadTaxData = jest.fn();

  test("renders two input texts and one button", () => {
    render(<CalculatorHeader onClickCalculate={mockLoadTaxData}/>);

    expect(screen.getAllByText(/tax year/i)).toBeTruthy();
    expect(screen.getAllByText("Annual Income")).toBeTruthy();
    expect(screen.getAllByText("Calculate")).toBeTruthy();
  });

  test("calculate button should be disabled if all inputs are empty", () => {
    render(<CalculatorHeader onClickCalculate={mockLoadTaxData}/>);

    const calculateBtn = screen.getByTestId("calculate-btn");

    expect(calculateBtn).toBeDisabled();

    // Note: taxYear doesn't need to set a value because it has a default year
    fireEvent.change(screen.getByTestId("annual-income"), { target: { value: 10000 }});

    expect(calculateBtn).not.toBeDisabled();
  });

  test("call click event hanlder on Calculate button", async () => {
    axios.mockResolvedValue({ data: { tax_brackets: [{ min: 0, max: 5000, rate: 0.15 }] }});

    render(<CalculatorHeader onLoadTaxData={mockLoadTaxData}/>);

    fireEvent.change(screen.getByTestId("tax-year"), { target: { value: "2022" }});
    fireEvent.change(screen.getByTestId("annual-income"), { target: { value: "10000" }});

    const calculateBtn = screen.getByTestId("calculate-btn");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act (async () => { 
      fireEvent.click(calculateBtn)
    });

    expect(mockLoadTaxData).toBeCalledWith({ taxYear: "2022", annualIncome: "10000", taxPerBand: [{ min: 0, max: 5000, rate: 0.15 }] });
  });
});