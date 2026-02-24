/**
 * DonationSummaryCard — Pre-submission review card
 * Shows all form data before a donor confirms the listing.
 *
 * Props:
 *   - formData: object with all donation form fields
 *   - onConfirm: callback when user confirms
 *   - onEdit: callback when user wants to go back and edit
 */
export default function DonationSummaryCard({ formData, onConfirm, onEdit }) {
    const {
        category,
        quantity,
        unit,
        expiryHours,
        temperature,
        refrigerated,
        checklist,
        urgent,
        title,
        description,
    } = formData;

    const fieldStyle = {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #e5e7eb",
        fontSize: "14px",
    };

    const labelStyle = {
        color: "#6b7280",
        fontWeight: "500",
    };

    const valueStyle = {
        color: "#111827",
        fontWeight: "600",
        textAlign: "right",
    };

    return (
        <div
            style={{
                border: "2px solid #10b981",
                borderRadius: "12px",
                padding: "24px",
                backgroundColor: "#f0fdf4",
                maxWidth: "480px",
            }}
        >
            <h3
                style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#065f46",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                📋 Review Your Donation
            </h3>

            {title && (
                <div style={fieldStyle}>
                    <span style={labelStyle}>Title</span>
                    <span style={valueStyle}>{title}</span>
                </div>
            )}

            {description && (
                <div style={fieldStyle}>
                    <span style={labelStyle}>Description</span>
                    <span style={{ ...valueStyle, maxWidth: "200px", wordWrap: "break-word" }}>
                        {description}
                    </span>
                </div>
            )}

            <div style={fieldStyle}>
                <span style={labelStyle}>Category</span>
                <span style={valueStyle}>{category || "Not selected"}</span>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Quantity</span>
                <span style={valueStyle}>
                    {quantity} {unit}
                </span>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Expires In</span>
                <span style={valueStyle}>{expiryHours} hours</span>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Temperature</span>
                <span style={valueStyle}>
                    {temperature === "hot" ? "🔥 Hot" : "❄️ Cold"}
                </span>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Refrigeration</span>
                <span style={valueStyle}>{refrigerated ? "✅ Required" : "❌ Not needed"}</span>
            </div>

            {checklist && checklist.length > 0 && (
                <div style={fieldStyle}>
                    <span style={labelStyle}>Safety</span>
                    <span style={valueStyle}>{checklist.join(", ")}</span>
                </div>
            )}

            {urgent && (
                <div
                    style={{
                        marginTop: "12px",
                        padding: "8px 12px",
                        backgroundColor: "#fef2f2",
                        border: "1px solid #ef4444",
                        borderRadius: "8px",
                        color: "#991b1b",
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    🚨 Marked as URGENT
                </div>
            )}

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "20px",
                }}
            >
                <button
                    onClick={onEdit}
                    style={{
                        flex: 1,
                        padding: "10px",
                        border: "2px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        color: "#374151",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    ✏️ Edit
                </button>
                <button
                    onClick={onConfirm}
                    style={{
                        flex: 1,
                        padding: "10px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: "#10b981",
                        color: "#fff",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    ✅ Confirm & Submit
                </button>
            </div>
        </div>
    );
}
