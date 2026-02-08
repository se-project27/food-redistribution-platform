import React from "react";

const QuantityInput = ({ quantity, setQuantity, unit, setUnit }) => {
  return (
    <div>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="kg">kg</option>
        <option value="servings">servings</option>
      </select>
    </div>
  );
};

export default QuantityInput;
