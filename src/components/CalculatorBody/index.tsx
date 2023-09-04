import React from 'react';
import TaxResults from '../TaxResults';
import Notification from '../Notification';
import { Grid } from '@mui/material';

interface CalculatorBodyProps {
  userInputs: any;
  taxPerBand: any;
}

const CalculatorBody = ({ userInputs: { totalIncome }, taxPerBand }: CalculatorBodyProps) => {

  return (
    <Grid container item
      flexDirection="column"
      flex={1}
      mt={4}
      sx={{
      }}      
    >
      <Notification />

      <TaxResults totalIncome={totalIncome} totalTax={17739.01} effectiveRate={20} taxPerBand={taxPerBand} />
    </Grid>
  );
}

export default CalculatorBody;
