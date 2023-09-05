import { Grid } from "@mui/material";
import { CalcedTaxPerBandType } from "../../models/taxes";
import { formatNumber } from "../../shared/helpers";
import LineField from "./LineField";

// render taxes and calculation based on the tax bracket
const TaxPerBand = ({calcedTaxPerBand}: { calcedTaxPerBand: Array<CalcedTaxPerBandType>}) => {
  return (
    <>
      <Grid container item justifyContent="space-between">
        {calcedTaxPerBand.map(({
          min, max, rate, annualIncome, 
          additionalIncome, additionalTax, basicTaxForTheBand, totalTax
        }: CalcedTaxPerBandType) => {
          return (
            <Grid container item flexDirection="column" xs={2} 
              sx={{ textAlign:"right", borderColor: totalTax ? "red": ""}}
            >
              <LineField value={`${min} ~ ${max||""}`} />
              <LineField value={annualIncome} />
              <LineField operator="-" value={min} />
              <LineField operator="=" value={additionalIncome} />
              <LineField operator="X" value={rate} />
              <LineField operator="=" value={formatNumber(additionalTax||0)} />
              <LineField operator="+" value={formatNumber(basicTaxForTheBand||0)} />
              <LineField operator="=" value={formatNumber(totalTax||0)} />
            </Grid>
          )}
        )}
      </Grid>
    </>
  )
}

export default TaxPerBand;
