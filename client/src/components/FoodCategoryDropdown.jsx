export default function FoodCategoryDropdown({ value, onChange }) {
    return (
        <select
            className="border p-2 rounded w-full"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Select Category</option>
            <option value="cooked">Cooked</option>
            <option value="raw">Raw</option>
            <option value="bakery">Bakery</option>
        </select>
    );
}
