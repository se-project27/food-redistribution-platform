import React from "react";
import DashboardWelcome from "../components/DashboardWelcome";
import UserStats from "../components/UserStats";

const Dashboard = () => {
  return (
    <div>
      <DashboardWelcome name="Tirupathi" />
      <UserStats />
    </div>
  );
};

export default Dashboard;