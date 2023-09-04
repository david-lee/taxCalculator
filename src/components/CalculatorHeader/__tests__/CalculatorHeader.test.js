import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalculatorHeader from '..';

describe("CalculatorHeader component", () => {
  let mockClickHandler = jest.fn();

  test("renders two input texts and one button", () => {
    render(<CalculatorHeader onClickCalculate={mockClickHandler}/>);

    expect(screen.getAllByText(/tax year/i)).toBeTruthy();
    expect(screen.getAllByText("Annual Income")).toBeTruthy();
    expect(screen.getAllByText("Calculate")).toBeTruthy();
  });

  test("calculate button should be disabled if all inputs are empty", () => {
    render(<CalculatorHeader onClickCalculate={mockClickHandler}/>);

    const calculateBtn = screen.getByTestId("calculate-btn");

    expect(calculateBtn).toBeDisabled();

    // Note: taxYear doesn't need to set a value because it has a default year
    fireEvent.change(screen.getByTestId("annual-income"), { target: { value: 10000 }});

    expect(calculateBtn).not.toBeDisabled();
  });

  test("call click event hanlder on Calculate button", () => {
    render(<CalculatorHeader onClickCalculate={mockClickHandler}/>);

    fireEvent.change(screen.getByTestId("tax-year"), { target: { value: "2022" }});
    fireEvent.change(screen.getByTestId("annual-income"), { target: { value: 10000 }});

    const calculateBtn = screen.getByTestId("calculate-btn");

    fireEvent.click(calculateBtn);

    expect(mockClickHandler).toBeCalledWith({ taxYear: "2022", annualIncome: 10000 });
  });
});