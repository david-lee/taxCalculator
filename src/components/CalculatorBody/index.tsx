import { useEffect, useState } from "react";
import TaxPerBand from "../TaxPerBand";
import { Grid, TextField } from "@mui/material";
import { CalcedTaxPerBandType } from "../../models/taxes";
import { transformTaxPerBand } from "../../shared/helpers";
import { CalculatorBodyProps } from "../../models/calculatorBody";
import { useErrorBoundary } from "react-error-boundary";
import { useIntl } from "react-intl";

// render total tax and effective tax rate as well as tax calculation per bracket
const CalculatorBody = ({ annualIncome = 0, taxPerBand }: CalculatorBodyProps) => {
  const [calcedTaxPerBand, setCalcedTaxPerBand] = useState<Array<CalcedTaxPerBandType>>([]);
  const [calcedTotalTax, setCalcedTotalTax] = useState(0);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
  const { showBoundary } = useErrorBoundary();
  const intl = useIntl();

  useEffect(() => {
    if (taxPerBand) {
      try {
        // transformedTaxPerBand will be passed down to TaxPerBand to render tax table per bracket
        const [totalTax, transformed] = transformTaxPerBand(annualIncome, taxPerBand);
      
        setCalcedTotalTax(totalTax);
        setEffectiveTaxRate(totalTax / annualIncome);
        setCalcedTaxPerBand(transformed);
      } catch (error) {
        showBoundary(error);
      }
    }
  }, [annualIncome, taxPerBand, showBoundary]);
  
  if (!taxPerBand) return null;

  return (
    <Grid container item flexDirection="column" flex={1} mt={4}>
      <Grid container item justifyContent="space-around" sx={{ my: 4 }}>
        <TextField label="Total Tax" variant="standard"
          value={intl.formatNumber(calcedTotalTax, { style: "currency", currency: "USD", maximumFractionDigits: 2 })} 
          sx={{ input: { textAlign: "right" }}} 
        />
        <TextField label="Effective Tax Rate"  variant="standard"
          value={intl.formatNumber(effectiveTaxRate, { style: "unit", unit: "percent", maximumFractionDigits: 2 })} 
          sx={{ input: { textAlign: "right" }}} 
        />
      </Grid>

      <TaxPerBand calcedTaxPerBand={calcedTaxPerBand} />
    </Grid>
  );
}

export default CalculatorBody;
