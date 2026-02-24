import { STATUS } from "../utils/statusWorkflow";

/**
 * DeliveryTracker — Visual step-by-step delivery status tracker.
 * Shows progress through: Available → Claimed → In Transit → Delivered
 *
 * Props:
 *   - currentStatus: string matching one of the STATUS values
 */
export default function DeliveryTracker({ currentStatus }) {
    const currentIndex = STATUS.indexOf(currentStatus);

    const stepIcons = {
        Available: "📦",
        Claimed: "🤝",
        "In Transit": "🚚",
        Delivered: "✅",
    };

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 16px",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        position: "relative",
    };

    return (
        <div>
            <p style={{ fontWeight: "600", marginBottom: "8px", fontSize: "15px", color: "#374151" }}>
                📍 Delivery Progress
            </p>
            <div style={containerStyle}>
                {STATUS.map((step, index) => {
                    const isCompleted = index <= currentIndex;
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={step}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                flex: 1,
                                position: "relative",
                            }}
                        >
                            {/* Connector line */}
                            {index > 0 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "18px",
                                        left: "-50%",
                                        width: "100%",
                                        height: "3px",
                                        backgroundColor: index <= currentIndex ? "#10b981" : "#d1d5db",
                                        zIndex: 0,
                                    }}
                                />
                            )}

                            {/* Step circle */}
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    zIndex: 1,
                                    backgroundColor: isActive
                                        ? "#10b981"
                                        : isCompleted
                                            ? "#d1fae5"
                                            : "#f3f4f6",
                                    color: isActive ? "#fff" : isCompleted ? "#065f46" : "#9ca3af",
                                    border: isActive
                                        ? "3px solid #059669"
                                        : isCompleted
                                            ? "2px solid #10b981"
                                            : "2px solid #d1d5db",
                                    transition: "all 0.3s ease",
                                    boxShadow: isActive ? "0 0 12px rgba(16,185,129,0.4)" : "none",
                                }}
                            >
                                {stepIcons[step]}
                            </div>

                            {/* Step label */}
                            <span
                                style={{
                                    marginTop: "8px",
                                    fontSize: "11px",
                                    fontWeight: isActive ? "700" : "500",
                                    color: isActive ? "#059669" : isCompleted ? "#065f46" : "#9ca3af",
                                    textAlign: "center",
                                }}
                            >
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
