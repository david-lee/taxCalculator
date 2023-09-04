import React, { useState } from 'react';
import CalculatorHeader from '../CalculatorHeader';
import CalculatorBody from '../CalculatorBody';
import { Grid } from '@mui/material';

const taxPerBand = [
  {
    "max": 50197,
    "min": 0,
    "rate": 0.15
  },
  {
    "max": 100392,
    "min": 50197,
    "rate": 0.205
  },
  {
    "max": 155625,
    "min": 100392,
    "rate": 0.26
  },
  {
    "max": 221708,
    "min": 155625,
    "rate": 0.29
  },
  {
    "min": 221708,
    "rate": 0.33
  }    
];

const TaxCalculator = () => {
  const [userInputs, setUserInputs] = useState({});

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid container item xs={12} md={8} flexDirection="column" 
        p={2} minHeight={500}
        sx={{
        }}
      >
        <CalculatorHeader onClickCalculate={setUserInputs} />
        <CalculatorBody userInputs={userInputs} taxPerBand={taxPerBand} />
      </Grid>
    </Grid>
  );
}

export default TaxCalculator;