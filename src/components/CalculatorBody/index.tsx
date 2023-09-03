import React from 'react';
import TaxResults from '../TaxResults';
import Notification from '../Notification';
import { Grid } from '@mui/material';

const CalculatorBody = ({ totalIncome }: { totalIncome: number }) => {
  const taxPerBandData = [
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

  return (
    <Grid container item
      flexDirection="column"
      flex={1}
      mt={4}
      sx={{
      }}      
    >
      <Notification />

      <TaxResults totalIncome={totalIncome} totalTax={17739.01} effectiveRate={20} taxPerBand={taxPerBandData} />
    </Grid>
  );
}

export default CalculatorBody;
