function AdminDashboard() {
  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <div style={styles.card}>
        <h3>System Overview</h3>
        <p>👤 Total Users: 128</p>
        <p>🍲 Food Donations: 52</p>
        <p>✅ Completed Deliveries: 39</p>
        <p>🌱 CO₂ Saved: ~120 kg</p>
      </div>

      <div style={styles.card}>
        <h3>User Verification</h3>
        <p>NGOs Pending Approval: 3</p>
        <p>Volunteers Pending Approval: 5</p>
        <button>Review Requests</button>
      </div>

      <div style={styles.card}>
        <h3>Food Safety Alerts</h3>
        <p>⚠ Expired Listings: 2</p>
        <button>View Alerts</button>
      </div>
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

export default AdminDashboard;
