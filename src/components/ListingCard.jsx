import React from "react";
import { formatDate } from "../utils/formatDate";

const ListingCard = ({ listing }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-semibold">{listing.title}</h3>
      <p>{listing.description}</p>
      <p className="text-sm text-gray-500">
        Posted: {formatDate(listing.createdAt)}
      </p>
    </div>
  );
};

export default ListingCard;