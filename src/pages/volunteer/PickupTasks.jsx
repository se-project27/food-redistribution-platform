import { useState } from "react";

function PickupTasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      foodName: "Vegetable Rice",
      quantity: "10 kg",
      pickupLocation: "RS Puram, Coimbatore",
      dropLocation: "Annai Shelter NGO",
      pickupTime: "Before 6:00 PM",
      status: "Assigned"
    },
    {
      id: 2,
      foodName: "Bread & Pastries",
      quantity: "20 servings",
      pickupLocation: "Gandhipuram, Coimbatore",
      dropLocation: "Helping Hands NGO",
      pickupTime: "Before 5:30 PM",
      status: "Assigned"
    }
  ]);

  const markCompleted = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: "Completed" } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <h2>Pickup Tasks</h2>

      {tasks.map(task => (
        <div key={task.id} style={styles.card}>
          <h3>{task.foodName}</h3>
          <p><strong>Quantity:</strong> {task.quantity}</p>
          <p><strong>Pickup From:</strong> {task.pickupLocation}</p>
          <p><strong>Deliver To:</strong> {task.dropLocation}</p>
          <p><strong>Pickup Time:</strong> {task.pickupTime}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: task.status === "Assigned" ? "orange" : "green" }}>
              {task.status}
            </span>
          </p>

          {task.status === "Assigned" && (
            <button onClick={() => markCompleted(task.id)}>
              🚚 Mark as Picked & Delivered
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

export default PickupTasks;
