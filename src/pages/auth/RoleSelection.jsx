import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    if (role === "donor") navigate("/donor");
    if (role === "ngo") navigate("/ngo");
    if (role === "volunteer") navigate("/volunteer");
  };

  return (
    <div style={styles.container}>
      <h2>Select Your Role</h2>

      <div style={styles.buttons}>
        <button onClick={() => selectRole("donor")}>Donor</button>
        <button onClick={() => selectRole("ngo")}>NGO</button>
        <button onClick={() => selectRole("volunteer")}>Volunteer</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "100px",
    textAlign: "center"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px"
  }
};

export default RoleSelection;
