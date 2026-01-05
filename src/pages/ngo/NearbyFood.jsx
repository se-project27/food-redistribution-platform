import { useState } from "react";

function NearbyFood() {
  const [foodList, setFoodList] = useState([
    {
      id: 1,
      foodName: "Vegetable Rice",
      category: "Cooked",
      quantity: 10,
      unit: "kg",
      expiryTime: "2025-01-10T18:00",
      location: "RS Puram, Coimbatore",
      status: "Available"
    },
    {
      id: 2,
      foodName: "Bread & Pastries",
      category: "Bakery",
      quantity: 20,
      unit: "servings",
      expiryTime: "2025-01-10T17:30",
      location: "Gandhipuram, Coimbatore",
      status: "Available"
    }
  ]);

  const acceptFood = (id) => {
    const updatedList = foodList.map((food) =>
      food.id === id ? { ...food, status: "Accepted" } : food
    );
    setFoodList(updatedList);
  };

  return (
    <div style={styles.container}>
      <h2>Nearby Food Listings</h2>

      {foodList.map((food) => (
        <div key={food.id} style={styles.card}>
          <h3>{food.foodName}</h3>
          <p><strong>Category:</strong> {food.category}</p>
          <p><strong>Quantity:</strong> {food.quantity} {food.unit}</p>
          <p><strong>Pickup Location:</strong> {food.location}</p>
          <p><strong>Expiry Time:</strong> {food.expiryTime}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: food.status === "Available" ? "green" : "blue" }}>
              {food.status}
            </span>
          </p>

          {food.status === "Available" && (
            <button onClick={() => acceptFood(food.id)}>
              ✅ Accept Food
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "40px auto"
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "5px"
  }
};

export default NearbyFood;
