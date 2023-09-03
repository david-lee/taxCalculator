import React from 'react';
import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import TaxCalculator from './components/TaxCalculator';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaxCalculator />
    </ThemeProvider>
  );
}

export default App;
