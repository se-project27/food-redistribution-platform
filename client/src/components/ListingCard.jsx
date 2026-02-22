export default function ListingCard({ item }) {
    return (
        <div
            className={`border p-4 rounded ${item.urgent ? "border-red-500" : "border-gray-300"
                }`}
        >
            <img src={item.image} alt="" className="w-full h-40 object-cover" />
            <h2 className="text-xl font-bold">{item.category}</h2>
            <p>
                {item.quantity} {item.unit}
            </p>
            <p>Expires in {item.expiryHours} hrs</p>

            {item.urgent && (
                <span className="text-red-600 font-semibold">URGENT</span>
            )}
        </div>
    );
}
