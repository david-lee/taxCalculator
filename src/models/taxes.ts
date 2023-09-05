export interface TaxPerBandType {
  min: number;
  max?: number;
  rate: number;
}
export interface CalcedTaxPerBandType extends TaxPerBandType {
  annualIncome?: number;
  additionalIncome?: number;
  additionalTax?: number;
  basicTaxForTheBand?: number;
  totalTax?: number;
}
export interface TaxResultProps {
  annualIncome: number;
  taxPerBand: Array<TaxPerBandType>;
  totalTax: number;
}

export interface TaxCalcInfo {
  annualIncome: number;
  taxPerBand: Array<TaxPerBandType>;
  taxYear: string;
}
