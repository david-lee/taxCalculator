import React from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CalculateIcon from '@mui/icons-material/Calculate';

const CalculatorHeader = () => {
  return (
    <Grid container item
      justifyContent="space-between"
      sx={{
      }
    }>
      <TextField label="Tax Year"></TextField>
      <TextField label="Annual Income"></TextField>
      <LoadingButton startIcon={<CalculateIcon />} onClick={() => null} variant="contained">Calculate</LoadingButton>
    </Grid>
  )
}

export default CalculatorHeader;
