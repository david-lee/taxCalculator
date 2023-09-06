import { Grid, Typography } from "@mui/material";
import useFormatNumber from "../../shared/hooks/useFormatNumber";

// render each line in the Federal tax on taxable income table with operator and value
// try to follow the style of https://www.canada.ca/en/financial-consumer-agency/services/financial-toolkit/taxes/taxes-2/5.html
const LineField = (
  { operator, value, isRate }: 
  { operator?: string | undefined; value?: string | number; isRate?: boolean }
) => {
  const isCalcedLine = operator === "=";
  const { formatCurrency, formatPercent } = useFormatNumber();

  //it will be undefined for annual income fields
  if (!operator) {
    return (
      <Grid container item justifyContent="right" alignItems="center">
        <Typography variant="body1" sx={{ pr: 1, minHeight: 24 }}>{ value ? formatCurrency(value as number) : "" }</Typography>
      </Grid>
    );
  }

  return (
    <Grid container item justifyContent="space-between" flexWrap="nowrap" alignItems="center"
      sx={{
        "& p:last-of-type" : { backgroundColor: `${ isCalcedLine ? "lightgray" : "white" }` }, 
        minHeight: 32, borderBottom: "1px solid gray"
      }}
    >
      <Typography variant="body1">{operator}</Typography>
      <Typography variant={`${ isCalcedLine ? "body1" : "h6" }`}
        sx={{ 
          pr: 1,
          width: "100%",
          color: `${isCalcedLine ? "navy" : "black"}`,
          fontWeight: `${isCalcedLine ? "bold" : ""}`
        }}
      >
        {isRate ? formatPercent(value as number * 100) : value ? formatCurrency(value as number) : ""}
      </Typography>
    </Grid>
  )
};

export default LineField;
