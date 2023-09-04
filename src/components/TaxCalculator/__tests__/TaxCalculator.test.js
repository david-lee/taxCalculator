import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
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
});