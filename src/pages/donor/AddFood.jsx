import { useState } from "react";

function AddFood() {
  const [foodData, setFoodData] = useState({
    foodName: "",
    category: "",
    quantity: "",
    unit: "kg",
    preparedTime: "",
    expiryTime: "",
    location: "",
    instructions: ""
  });

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !foodData.foodName ||
      !foodData.category ||
      !foodData.quantity ||
      !foodData.preparedTime ||
      !foodData.expiryTime ||
      !foodData.location
    ) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Food Submitted:", foodData);
    alert("Food listed successfully (dummy)");

    // Reset form
    setFoodData({
      foodName: "",
      category: "",
      quantity: "",
      unit: "kg",
      preparedTime: "",
      expiryTime: "",
      location: "",
      instructions: ""
    });
  };

  return (
    <div style={styles.container}>
      <h2>Add Surplus Food</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={foodData.foodName}
          onChange={handleChange}
        />

        <select
          name="category"
          value={foodData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Cooked">Cooked</option>
          <option value="Bakery">Bakery</option>
          <option value="Raw">Raw</option>
          <option value="Packaged">Packaged</option>
        </select>

        <div style={styles.row}>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={foodData.quantity}
            onChange={handleChange}
          />

          <select
            name="unit"
            value={foodData.unit}
            onChange={handleChange}
          >
            <option value="kg">kg</option>
            <option value="liters">liters</option>
            <option value="servings">servings</option>
          </select>
        </div>

        <label>Prepared Time</label>
        <input
          type="datetime-local"
          name="preparedTime"
          value={foodData.preparedTime}
          onChange={handleChange}
        />

        <label>Expiry Time</label>
        <input
          type="datetime-local"
          name="expiryTime"
          value={foodData.expiryTime}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Pickup Location"
          value={foodData.location}
          onChange={handleChange}
        />

        <textarea
          name="instructions"
          placeholder="Additional Instructions (optional)"
          value={foodData.instructions}
          onChange={handleChange}
        />

        <button type="submit">Submit Food</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  row: {
    display: "flex",
    gap: "10px"
  }
};

export default AddFood;
