import { Grid, Typography } from "@mui/material";

// render each line with operator and value
// try to follow the style of https://www.canada.ca/en/financial-consumer-agency/services/financial-toolkit/taxes/taxes-2/5.html
const LineField = ({ operator, value }: { operator?: string | undefined; value: string | number | undefined }) => {
  const isCalced = operator === "=";

  //it will be undefined for salary range and annual income fields
  if (!operator) {
    return <Typography variant="body1">{value || "-"}</Typography>;
  }

  return (
    <Grid container item justifyContent="space-between" flexWrap="nowrap"
      sx={{
        "& p:last-of-type" : { backgroundColor: `${ isCalced ? "lightgray" : "white" }` },
      }}
    >
      <Typography variant="body1">{operator}</Typography>
      <Typography variant={`${ isCalced ? "body1" : "h6" }`} 
        sx={{ 
          width: "100%",
          color: `${isCalced ? "navy" : "black"}`,
          fontWeight: `${isCalced ? "bold" : ""}` 
        }}
      >
        {value}
      </Typography>
    </Grid>
  )
};

export default LineField;
