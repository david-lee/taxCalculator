import { transformTaxPerBand } from "../helpers";

describe("helpers", () => {
  test("transformTaxPerBand transform data for tax per band", () => {
    const taxPerBand = [
      {"max":50197,"min":0,"rate":0.15},
      {"max":100392,"min":50197,"rate":0.205},
      {"max":155625,"min":100392,"rate":0.26},
      {"max":221708,"min":155625,"rate":0.29},
      {"min":221708,"rate":0.33}
    ];
    
    const mapped = transformTaxPerBand(50000, taxPerBand);
    
    expect(mapped[0]).toBe(7500);
    expect(mapped[1].length).toBe(5);
    expect(mapped[1][0]).toHaveProperty("annualIncome", 50000);
    expect(mapped[1][1]).toHaveProperty("annualIncome", 0);
    expect(mapped[1][0]).toHaveProperty("additionalIncome", 50000);
    expect(mapped[1][1]).toHaveProperty("additionalIncome", 0);
    expect(mapped[1][0]).toHaveProperty("additionalTax", 7500);
    expect(mapped[1][1]).toHaveProperty("additionalTax", 0);
    expect(mapped[1][0]).toHaveProperty("basicTaxForTheBand", 0);
    expect(mapped[1][1]).toHaveProperty("basicTaxForTheBand", 7529.549999999999);
    expect(mapped[1][0]).toHaveProperty("totalTax", 7500);
    expect(mapped[1][1]).toHaveProperty("totalTax", 0);
  });
});
