import React from "react";

const FoodCategoryDropdown = ({ value, setValue }) => {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="Cooked">Cooked</option>
      <option value="Raw">Raw</option>
      <option value="Bakery">Bakery</option>
    </select>
  );
};

export default FoodCategoryDropdown;
