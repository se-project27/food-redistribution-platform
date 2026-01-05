import { useNavigate } from "react-router-dom";

function VolunteerDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Volunteer Dashboard</h2>

      <div style={styles.card}>
        <button onClick={() => navigate("/volunteer/tasks")}>
          🚴 View Pickup Tasks
        </button>

        <button onClick={() => navigate("/volunteer/history")}>
          📍 Delivery History
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "60px"
  },
  card: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px"
  }
};

export default VolunteerDashboard;
