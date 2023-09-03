import { Grid } from '@mui/material';
import React from 'react';

interface TaxPerBandProps {
  totalIncome: number;
  taxPerBand: Array<unknown>
}

const TaxPerBand = ({ totalIncome, taxPerBand }: TaxPerBandProps) => {
  return (
    <Grid container>

    </Grid>
  )
}

export default TaxPerBand;
