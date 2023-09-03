import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';

interface TaxPerBandType {
  min: number;
  max?: number;
  rate: number;
}
interface CalcedTaxPerBandType extends TaxPerBandType {
  totalIncome?: number;
  additionalIncome?: number;
  additionalTax?: number;
  basicTaxForTheBand?: number;
}
interface TaxResultProps {
  totalIncome: number;
  taxPerBand: Array<TaxPerBandType>;
  effectiveRate: number;
  totalTax: number;
}
const TaxResults = ({
  totalIncome,
  taxPerBand,
  effectiveRate = 20,
  totalTax = 17739.17,
}: TaxResultProps) => {
  const [calcedTaxPerBand, setCalcedTaxPerBand] = useState(Array<CalcedTaxPerBandType>);

  const formatNumber = (num: number) => (Math.round(num * 1000) / 1000).toFixed(2);

  useEffect(() => {
    let prevBandRate: number;
    let prevMin: number;
    let prevBasicTax: number = 0;
    
    const mappedTaxPerBand = taxPerBand.map((tax) => {
      const { min, max = 9999999, rate } = tax;
      const isIncomeInTheBand = totalIncome >= min && totalIncome < max
      let additionalIncome = 0;
      let additionalTax = 0;
      let basicTaxForTheBand = 0;
      
      if (isIncomeInTheBand) {
        additionalIncome = totalIncome - min;
        additionalTax = additionalIncome * rate;
      }

      basicTaxForTheBand = min !== 0 ? ((min - prevMin) * prevBandRate) + prevBasicTax: 0;
      prevBasicTax = basicTaxForTheBand;
      prevBandRate = rate;
      prevMin = min;

      return { ...tax, 
          totalIncome: isIncomeInTheBand ? totalIncome : 0, 
          additionalIncome, 
          additionalTax, 
          basicTaxForTheBand,
        }
    });

    console.log(mappedTaxPerBand);

    setCalcedTaxPerBand(mappedTaxPerBand);
  }, [totalIncome, taxPerBand]);

  return (
    <>
      <Grid container item justifyContent="space-around">
        <TextField label="Total Tax" value={totalTax} />
        <TextField label="Effective Rate" value={effectiveRate} />
      </Grid>

      <Grid container item justifyContent="space-between">
        {calcedTaxPerBand.map(({min, max = 9999999, rate, totalIncome, additionalIncome, additionalTax = 0, basicTaxForTheBand = 0}) => {
          return (
            <Grid item xs={2}>
              <div>{min} ~ {max}</div>
              <div>{totalIncome || "-"}</div>
              <div>{min}</div>
              <div>{additionalIncome}</div>
              <div>{rate}</div>
              <div>{formatNumber(additionalTax)}</div>
              <div>{formatNumber(basicTaxForTheBand)}</div>
              <div>{formatNumber(basicTaxForTheBand + additionalTax)}</div>
            </Grid>
          )}
        )}
      </Grid>
    </>
  )
}

export default TaxResults;
