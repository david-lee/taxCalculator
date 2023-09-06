import TaxPerBand from "..";
import { render } from "../../../shared/rtlHelpers";

describe("TaxPerBand component", () => {
  test("renders tax per band", () => {
    render(<TaxPerBand calcedTaxPerBand={[
      { "max":50197,"min":0,"rate":0.15, "annualIncome": 50000, additionalIncome: 50000, additionalTax: 7500, totalTax: 75000 },
      { "max":100392,"min":50197,"rate":0.205, "annualIncome": 0, additionalIncome: 0, additionalTax: 0, totalTax: 0 }
    ]} />);
  })
});