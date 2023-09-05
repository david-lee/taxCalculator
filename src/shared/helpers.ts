import { CalcedTaxPerBandType, TaxPerBandType } from "../models/taxes";

export const formatNumber = (num: number) => (Math.round(num * 1000) / 1000).toFixed(2);

export const transformTaxPerBand = (annualIncome: number, taxPerBand: any): [number, Array<CalcedTaxPerBandType>] => {
  let prevBandRate: number;
  let prevMin: number;
  let prevBasicTax: number = 0;
  let totalTaxForTheIncome = 0;
  
  const mappedTaxPerBand = (taxPerBand as Array<TaxPerBandType>).map((tax) => {
    const { min, max, rate } = tax;

    // there is no max rate in the last band
    const isIncomeInTheBand = max ? annualIncome >= min && annualIncome < max : annualIncome >= min;
  
    let additionalIncome = 0;
    let additionalTax = 0;
    let basicTaxForTheBand = 0;
    
    // the basic tax for this band is calculated based on the previous band info
    // total tax will be basicTaxForTheBand plus additionalTax
    basicTaxForTheBand = min !== 0 ? ((min - prevMin) * prevBandRate) + prevBasicTax: 0;

    if (isIncomeInTheBand) {
      additionalIncome = annualIncome - min;
      additionalTax = additionalIncome * rate;
      totalTaxForTheIncome = basicTaxForTheBand + additionalTax;
    }

    prevBasicTax = basicTaxForTheBand;
    prevBandRate = rate;
    prevMin = min;

    return { 
        ...tax, 
        annualIncome: isIncomeInTheBand ? annualIncome : 0, 
        additionalIncome, 
        additionalTax, 
        basicTaxForTheBand,
        totalTax: isIncomeInTheBand ? basicTaxForTheBand + additionalTax : 0
      }
    });
  
  return [totalTaxForTheIncome, mappedTaxPerBand]
}