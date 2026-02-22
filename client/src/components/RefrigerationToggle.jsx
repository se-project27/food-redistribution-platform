export default function RefrigerationToggle({ value, onChange }) {
    return (
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
            />
            Refrigeration Required
        </label>
    );
}
