import React from "react";

const VerifiedBadge = ({ verified }) => {
  if (!verified) return null;

  return <span style={{ color: "green" }}>✔ Verified</span>;
};

export default VerifiedBadge;
