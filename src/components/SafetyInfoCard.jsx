import React from "react";

const SafetyInfoCard = ({ notes }) => {
  return (
    <div>
      <h4>Safety Notes</h4>
      <p>{notes}</p>
    </div>
  );
};

export default SafetyInfoCard;