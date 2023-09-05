import { useState } from "react";
import CalculatorHeader from "../CalculatorHeader";
import CalculatorBody from "../CalculatorBody";
import { Grid, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback";
import { TaxCalcInfo } from "../../models/taxes";

const TaxCalculator = () => {
  const [taxCalcInfo, setTaxCalcInfo] = useState<TaxCalcInfo>();

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid container item xs={12} md={7} flexDirection="column" 
        p={2} minHeight={500}
        sx={{}}
      >
        <Typography variant="h3" sx={{ mb: 5 }}>Federal Tax Calculator</Typography>
        
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => {
          console.log("Error on tax calculation");
        }}>
          <CalculatorHeader onLoadTaxData={setTaxCalcInfo} />
          <CalculatorBody annualIncome={taxCalcInfo?.annualIncome} taxPerBand={taxCalcInfo?.taxPerBand} />
        </ErrorBoundary>
      </Grid>
    </Grid>
  );
}

export default TaxCalculator;