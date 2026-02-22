import { useState } from "react";
import FoodCategoryDropdown from "../components/FoodCategoryDropdown";
import QuantityInput from "../components/QuantityInput";
import ExpiryInput from "../components/ExpiryInput";
import SafetyChecklist from "../components/SafetyChecklist";
import TemperatureTag from "../components/TemperatureTag";
import ImageUpload from "../components/ImageUpload";
import RefrigerationToggle from "../components/RefrigerationToggle";

export default function CreateListing() {
    const [form, setForm] = useState({
        category: "",
        quantity: "",
        unit: "kg",
        expiryHours: 0,
        temperature: "hot",
        refrigerated: false,
        checklist: [],
        image: "",
        urgent: false,
    });

    const handleSubmit = () => {
        console.log("Submitting listing:", form);
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Create Food Listing</h1>

            <FoodCategoryDropdown
                value={form.category}
                onChange={(v) => setForm({ ...form, category: v })}
            />

            <QuantityInput
                quantity={form.quantity}
                unit={form.unit}
                onChange={(q, u) => setForm({ ...form, quantity: q, unit: u })}
            />

            <ExpiryInput
                hours={form.expiryHours}
                onChange={(h) => setForm({ ...form, expiryHours: h })}
            />

            <TemperatureTag
                value={form.temperature}
                onChange={(t) => setForm({ ...form, temperature: t })}
            />

            <RefrigerationToggle
                value={form.refrigerated}
                onChange={(r) => setForm({ ...form, refrigerated: r })}
            />

            <SafetyChecklist
                selected={form.checklist}
                onChange={(list) => setForm({ ...form, checklist: list })}
            />

            <ImageUpload
                onUpload={(url) => setForm({ ...form, image: url })}
            />

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={form.urgent}
                    onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
                />
                Mark as Urgent
            </label>

            <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Submit Listing
            </button>
        </div>
    );
}
