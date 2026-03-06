import React from "react";
import ProfileInfoCard from "../components/ProfileInfoCard";
import RatingSummary from "../components/RatingSummary";

const Profile = () => {
  return (
    <div>
      <ProfileInfoCard name="User" email="user@example.com" />
      <RatingSummary avg={4.2} />
    </div>
  );
};

export default Profile;