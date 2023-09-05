import { Grid, Typography } from "@mui/material";
import { CalcedTaxPerBandType } from "../../models/taxes";
import LineField from "./LineField";
import useFormatNumber from "../../shared/hooks/useFormatNumber";

// render taxes and calculation based on the tax bracket
const TaxPerBand = ({calcedTaxPerBand}: { calcedTaxPerBand: Array<CalcedTaxPerBandType>}) => {
  const { formatCurrency } = useFormatNumber();

  return (
    <>
      <Grid container item justifyContent="space-between">
        {calcedTaxPerBand.map(({
          min, max, rate, annualIncome, 
          additionalIncome, additionalTax, basicTaxForTheBand, totalTax
        }: CalcedTaxPerBandType) => {
          return (
            <Grid container item flexDirection="column" xs={2} gap={1}
              sx={{ 
                "& div:last-of-type": { border: "1px solid black" }, textAlign:"right"
              }}
            >
              <Typography variant="body1">
                { formatCurrency(min as number, 0) } ~ { max ? formatCurrency(max as number, 0) : "" }
              </Typography>
              <LineField value={annualIncome || 0} />
              <LineField operator="-" value={min} />
              <LineField operator="=" value={additionalIncome || 0} />
              <LineField operator="X" value={rate * 100} isRate />
              <LineField operator="=" value={additionalTax || 0} />
              <LineField operator="+" value={basicTaxForTheBand || 0} />
              <LineField operator="=" value={totalTax || 0} />
            </Grid>
          )}
        )}
      </Grid>
    </>
  )
}

export default TaxPerBand;
