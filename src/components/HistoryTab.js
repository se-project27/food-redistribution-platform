import React from "react";

const HistoryTab = ({ history }) => {
  return (
    <div>
      <h3>Past Contributions</h3>
      {history?.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

export default HistoryTab;
