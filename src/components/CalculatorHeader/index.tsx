import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CalculateIcon from '@mui/icons-material/Calculate';

interface CalculatorHeaderProps {
  onClickCalculate: ({taxYear, annualIncome}: { taxYear: string; annualIncome: number }) => void;
}

const CalculatorHeader = ({ onClickCalculate }: CalculatorHeaderProps) => {
  // by default, show the previous tax year
  const [taxYear, setTaxYear] = useState(() => (new Date().getFullYear() - 1).toString());
  const [annualIncome, setAnnualIncome] = useState(0);
  const [isValidInputs, setIsValueInputs] = useState(false);

  useEffect(() => {
    // TODO: try to use formik or other react form lib if more validations are required
    setIsValueInputs(taxYear?.length === 4 && +annualIncome > 0); 
  }, [taxYear, annualIncome]);

  return (
    <Grid container item
      justifyContent="space-between"
      sx={{
      }
    }>
      <TextField label="Tax Year" value={taxYear}
        inputProps={{ "data-testid": "tax-year"}}
        onChange={(e) => { setTaxYear(e.target.value) }}
      />
      <TextField label="Annual Income" value={annualIncome} 
        inputProps={{ "data-testid": "annual-income "}}
        onChange={(e) => { setAnnualIncome(+e.target.value) }}
      />
      <LoadingButton variant="contained" data-testid="calculate-btn" startIcon={<CalculateIcon />}
        disabled={!isValidInputs}
        onClick={() => onClickCalculate({ taxYear, annualIncome })}
      >
        Calculate
      </LoadingButton>
    </Grid>
  )
}

export default CalculatorHeader;
