import { useCallback, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { TaxCalcInfo } from "../../models/taxes";
import CalculatorHeader from "../CalculatorHeader";
import CalculatorBody from "../CalculatorBody";
import ErrorFallback from "../ErrorFallback";

// It is a top component for the app. 
// It has an ErrorBoundary to deal with errors on user inputs and API calls
const TaxCalculator = () => {
  // it will include user inputs and tax brackets
  const [taxCalcInfo, setTaxCalcInfo] = useState<TaxCalcInfo>();

  const handleErrors = useCallback((error: unknown) => {
    // TODO: send error to a remote server, if available: like Sentry
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid container item xs={12} md={8} flexDirection="column" p={2} minHeight={500}>
        <Typography variant="h3" sx={{ mb: 5 }}>Federal Tax Calculator</Typography>

        <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleErrors}>
          {/* get user inputs and load tax bracket data from API based on tax year */}
          <CalculatorHeader onLoadTaxData={setTaxCalcInfo} />
          {/* show the result of tax calculations: total tax and effective tax rate */}
          <CalculatorBody annualIncome={taxCalcInfo?.annualIncome} taxPerBand={taxCalcInfo?.taxPerBand} />
        </ErrorBoundary>
      </Grid>
    </Grid>
  );
}

export default TaxCalculator;