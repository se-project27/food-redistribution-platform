const OPTIONS = ["Fresh", "Hygienic", "Properly Packed"];

export default function SafetyChecklist({ selected, onChange }) {
    const toggle = (item) => {
        if (selected.includes(item)) {
            onChange(selected.filter((i) => i !== item));
        } else {
            onChange([...selected, item]);
        }
    };

    return (
        <div>
            <p className="font-semibold">Safety Checklist</p>
            {OPTIONS.map((opt) => (
                <label key={opt} className="block">
                    <input
                        type="checkbox"
                        checked={selected.includes(opt)}
                        onChange={() => toggle(opt)}
                    />
                    {opt}
                </label>
            ))}
        </div>
    );
}
