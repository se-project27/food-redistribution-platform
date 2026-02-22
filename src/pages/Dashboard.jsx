import { useEffect, useState } from "react";
import { fetchListings } from "../utils/api";
import ListingCard from "../components/ListingCard";

const Dashboard = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchListings();
      setListings(data);
    };
    loadData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default Dashboard;