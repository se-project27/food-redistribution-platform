import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Donor Dashboard</h2>

      <div style={styles.card}>
        <button onClick={() => navigate("/donor/add-food")}>
          ➕ Add Surplus Food
        </button>

        <button onClick={() => navigate("/donor/status")}>
          📦 View Food Status
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

export default DonorDashboard;
