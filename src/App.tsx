import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import TaxCalculator from "./components/TaxCalculator";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import { useCallback } from "react";
import { IntlProvider } from "react-intl";
import { DEFAULT_LOCALE } from "./data/constants";

function App() {
  const theme = createTheme();

  const handleError = useCallback((error: unknown) => {
    // TODO: send errors to a remote server, if available: like Sentry
    console.log("Global Error: ", error);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <IntlProvider locale={DEFAULT_LOCALE} onError={handleError}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
          <TaxCalculator />
        </ErrorBoundary>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
