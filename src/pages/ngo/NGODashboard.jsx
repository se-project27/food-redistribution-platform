import { useNavigate } from "react-router-dom";

function NGODashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>NGO Dashboard</h2>

      <div style={styles.card}>
        <button onClick={() => navigate("/ngo/nearby-food")}>
          🥗 View Nearby Food
        </button>

        <button onClick={() => navigate("/ngo/accepted")}>
          ✅ Accepted Donations
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

export default NGODashboard;
