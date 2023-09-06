import { ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { DEFAULT_LOCALE } from "../data/constants";
import { ErrorBoundary } from "react-error-boundary";
import { IntlProvider } from "react-intl";
import ErrorFallback from "../components/ErrorFallback";
// import { BrowserRouter as Router } from "react-router-dom";
import theme from "../theme";

const customRender = (
  uiComponent,
  { state = {} } = {},
  { route = "/" } = {}
) => {
  const AllTheProvidres = ({ children }) => {
    window.history.pushState({}, "Test page", route);
  
    return (
      <ThemeProvider theme={theme}>
        {/* <Router> */}
          <IntlProvider locale={DEFAULT_LOCALE}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => {}}>
              {children}
            </ErrorBoundary>
          </IntlProvider>
        {/* </Router> */}
      </ThemeProvider>
    );
  };

  return render(uiComponent, { wrapper: AllTheProvidres });
};

// re-export everything
export * from "@testing-library/react";
export * from "@testing-library/jest-dom";
export { default as userEvent } from "@testing-library/user-event";

// override render method with customRender
export { customRender as render };
