import { useEffect, useState } from "react";
import TaxPerBand from "../TaxPerBand";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { CalcedTaxPerBandType } from "../../models/taxes";
import { formatNumber, transformTaxPerBand } from "../../shared/helpers";

interface CalculatorBodyProps {
  annualIncome: number | undefined;
  taxPerBand: any;
}

const CalculatorBody = ({ annualIncome = 0, taxPerBand }: CalculatorBodyProps) => {
  const [calcedTaxPerBand, setCalcedTaxPerBand] = useState<Array<CalcedTaxPerBandType>>([]);
  const [calcedTotalTax, setCalcedTotalTax] = useState(0);

  useEffect(() => {
    if (taxPerBand) {
      // transformedTaxPerBand will be passed down to TaxPerBand to render tax table per bracket
      const [totalTax, transformed] = transformTaxPerBand(annualIncome, taxPerBand);
    
      setCalcedTotalTax(totalTax);
      setCalcedTaxPerBand(transformed);
    }
  }, [annualIncome, taxPerBand]);
  
  if (!taxPerBand) return null;

  return (
    <Grid container item flexDirection="column" flex={1} mt={4}>
      <Grid container item justifyContent="space-around" sx={{ my: 4 }}>
        <TextField label="Total Tax" value={formatNumber(calcedTotalTax)} variant="standard" 
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>}}
          sx={{ input: { textAlign: "right" }}} 
        />
        <TextField label="Effective Tax Rate" value={calcedTotalTax / annualIncome} variant="standard" 
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment>}}
          sx={{ input: { textAlign: "right" }}} 
        />
      </Grid>

      <TaxPerBand calcedTaxPerBand={calcedTaxPerBand} />
    </Grid>
  );
}

export default CalculatorBody;
