import CalculatorBody from "..";
import TaxPerBand from "../../TaxPerBand";
import { render, screen } from "../../../shared/rtlHelpers";

jest.mock("../../TaxPerBand");

describe("CalculatorBody", () => {
  test("renders total tax, effective tax reate and tax per band", () => {
    render(<CalculatorBody annualIncome={50000} taxPerBand={[{ min: 0, max: 55000, rate: 0.15 },  {min: 55000, max: 10000, rate: 0.25 }]} />);

    expect(screen.getByText("Total Tax")).toBeInTheDocument();
    expect(screen.getByText("Effective Tax Rate")).toBeInTheDocument();
    expect(TaxPerBand).toBeCalled();
  });

  test("renders nothing if taxPerBand is null", () => {
    render(<CalculatorBody annualIncome={50000} taxPerBand={null} />);

    expect(screen.queryByText("Total Tax")).not.toBeInTheDocument();
    expect(screen.queryByText("Effective Tax Rate")).not.toBeInTheDocument();
    expect(TaxPerBand).not.toBeCalled();
  });  
});