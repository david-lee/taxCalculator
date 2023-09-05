import { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CalculateIcon from "@mui/icons-material/Calculate";
import useAPIClient from "../../shared/hooks/useAPIClient";
import { CalculatorHeaderProps } from "../../models/calculatorHeader";

// get user an annualIncome and a tax year from a user and load tax per band
// once tax brackets are loaded it will be returned to the parent along with user inputs
const CalculatorHeader = ({ onLoadTaxData }: CalculatorHeaderProps) => {
  // show the previous tax year as default
  const [taxYear, setTaxYear] = useState(() => (new Date().getFullYear() - 1).toString());
  const [annualIncome, setAnnualIncome] = useState<string|number>("");
  const [isValidInputs, setIsValueInputs] = useState(false);

  const { loading, error, data, makeRequest } = useAPIClient();

  useEffect(() => {
    // TODO: try to use formik or other form lib for more validations
    setIsValueInputs(taxYear?.length === 4 && +annualIncome > 0); 
  }, [taxYear, annualIncome]);

  useEffect(() => {
    if (data) {
      onLoadTaxData({ 
        taxYear,
        annualIncome: annualIncome as number,
        taxPerBand: data.tax_brackets
      });
    }

  // Note: onLoadTaxData should be called only when data is retried
  //    so taxYear, annualIncome and taxPerBand shouldn't be included in the dependency

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Grid container item justifyContent="space-between">
      <TextField label="Tax Year" value={taxYear} inputProps={{ "data-testid": "tax-year"}}
        onChange={(e) => { setTaxYear(e.target.value) }}
      />
      <TextField label="Annual Income" value={annualIncome} inputProps={{ "data-testid": "annual-income "}}
        onChange={(e) => { setAnnualIncome(e.target.value) }}
      />

      <LoadingButton variant="contained" data-testid="calculate-btn" startIcon={<CalculateIcon />}
        disabled={!isValidInputs || !!error} loading={loading}
        onClick={() => makeRequest({ url: `tax-year/${taxYear}` })}
      >
        Calculate
      </LoadingButton>
    </Grid>
  )
}

export default CalculatorHeader;
