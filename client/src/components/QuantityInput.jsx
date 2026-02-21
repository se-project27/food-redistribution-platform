export default function QuantityInput({ quantity, unit, onChange }) {
    return (
        <div className="flex gap-2">
            <input
                type="number"
                className="border p-2 rounded w-full"
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => onChange(e.target.value, unit)}
            />
            <select
                value={unit}
                onChange={(e) => onChange(quantity, e.target.value)}
                className="border p-2 rounded"
            >
                <option value="kg">kg</option>
                <option value="servings">servings</option>
            </select>
        </div>
    );
}
