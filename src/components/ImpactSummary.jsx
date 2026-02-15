import React from "react";

const ImpactSummary = ({ meals = 0, co2 = 0 }) => {
  return (
    <div>
      <h3>Impact Summary</h3>
      <p>Meals Saved: {meals}</p>
      <p>CO2 Saved: {co2} kg</p>
    </div>
  );
};

export default ImpactSummary;
