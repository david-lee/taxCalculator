import React from 'react';
import CalculatorHeader from '../CalculatorHeader';
import CalculatorBody from '../CalculatorBody';
import { Grid } from '@mui/material';

const TaxCalculator = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid container xs={12} md={8}
        flexDirection="column"
        minHeight={500}
        p={2}
        sx={{
        }}
      >
        <CalculatorHeader />
        <CalculatorBody totalIncome={100000}/>
      </Grid>
    </Grid>
  );
}

export default TaxCalculator;