import { useIntl } from "react-intl";

const useFormatNumber = () => {
  const intl = useIntl();

  const formatCurrency = (value: number, fractionDigits?: number) => (
    intl.formatNumber(value, { style: "currency", currency: "USD", maximumFractionDigits: fractionDigits ?? 2 })
  );
    
  const formatPercent = (value: number, fractionDigits?: number) => (
    intl.formatNumber(value, { style: "unit", unit: "percent", maximumFractionDigits: 2 ?? fractionDigits ?? 2 })
  );
  
  return { formatCurrency, formatPercent };
}

export default useFormatNumber;
