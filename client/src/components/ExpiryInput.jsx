export default function ExpiryInput({ hours, onChange }) {
    return (
        <input
            type="number"
            className="border p-2 rounded w-full"
            value={hours}
            placeholder="Expiry (hours)"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
