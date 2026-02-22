export default function TemperatureTag({ value, onChange }) {
    return (
        <div className="flex gap-3">
            <button
                className={`px-3 py-1 rounded ${value === "hot" ? "bg-red-500 text-white" : "bg-gray-200"
                    }`}
                onClick={() => onChange("hot")}
            >
                Hot
            </button>
            <button
                className={`px-3 py-1 rounded ${value === "cold" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                onClick={() => onChange("cold")}
            >
                Cold
            </button>
        </div>
    );
}
