import { TaxCalcInfo } from "./taxes";

export interface CalculatorHeaderProps {
  onLoadTaxData: ({ taxYear, annualIncome, taxPerBand }: TaxCalcInfo ) => void;
}