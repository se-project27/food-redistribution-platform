/**
 * SearchBar — Reusable search bar with category and veg/non-veg filters.
 *
 * Props:
 *   - searchTerm: current search string
 *   - onSearchChange: callback for search input changes
 *   - filterCategory: current category filter value
 *   - onCategoryChange: callback for category filter changes
 *   - filterVeg: current veg filter value ("All", "Veg", "Non-Veg")
 *   - onVegChange: callback for veg filter changes
 *   - placeholder: optional placeholder text
 */
export default function SearchBar({
    searchTerm,
    onSearchChange,
    filterCategory,
    onCategoryChange,
    filterVeg,
    onVegChange,
    placeholder = "🔍 Search food listings...",
}) {
    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "12px 16px",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        alignItems: "center",
    };

    const inputStyle = {
        flex: "1 1 200px",
        padding: "10px 14px",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.2s",
    };

    const selectStyle = {
        padding: "10px 14px",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        fontSize: "14px",
        backgroundColor: "#fff",
        cursor: "pointer",
        outline: "none",
    };

    return (
        <div style={containerStyle}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
                style={inputStyle}
            />

            <select
                value={filterCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                style={selectStyle}
            >
                <option value="All">📦 All Categories</option>
                <option value="Cooked">🥘 Cooked</option>
                <option value="Raw">🥦 Raw</option>
                <option value="Bakery">🍞 Bakery</option>
            </select>

            <select
                value={filterVeg}
                onChange={(e) => onVegChange(e.target.value)}
                style={selectStyle}
            >
                <option value="All">🍽️ All Types</option>
                <option value="Veg">🥬 Veg Only</option>
                <option value="Non-Veg">🍗 Non-Veg Only</option>
            </select>
        </div>
    );
}
