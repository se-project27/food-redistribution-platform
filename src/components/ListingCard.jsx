const ListingCard = ({ listing }) => {
  return (
    <div className="border p-4 rounded shadow mb-3">
      <h3 className="font-bold">{listing.title}</h3>
      <p>Quantity: {listing.quantity}</p>
    </div>
  );
};

export default ListingCard;