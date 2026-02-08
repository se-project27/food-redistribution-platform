import React from "react";

const TemperatureTag = ({ temp, setTemp }) => {
  return (
    <select value={temp} onChange={(e) => setTemp(e.target.value)}>
      <option value="Hot">Hot</option>
      <option value="Cold">Cold</option>
    </select>
  );
};

export default TemperatureTag;
