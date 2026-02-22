import React from "react";

const RatingSummary = ({ avg = 0 }) => {
  return <div>Average Rating: {avg}</div>;
};

export default RatingSummary;