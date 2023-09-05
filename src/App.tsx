import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import TaxCalculator from './components/TaxCalculator';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <TaxCalculator />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
