import React from "react";

const RoleSelector = ({ role, setRole }) => {
  return (
    <div>
      <label>Select Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Donor">Donor</option>
        <option value="NGO">NGO</option>
        <option value="Volunteer">Volunteer</option>
      </select>
    </div>
  );
};

export default RoleSelector;
