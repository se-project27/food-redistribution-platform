import { useState, useEffect } from "react";

/**
 * ExpiryCountdown — Live countdown timer showing remaining time
 * until food expires, with color-coded urgency indicators.
 *
 * Props:
 *   - createdAt: ISO date string when the listing was created
 *   - expiryHours: number of hours until expiry from creation time
 */
export default function ExpiryCountdown({ createdAt, expiryHours }) {
    const [timeLeft, setTimeLeft] = useState("");
    const [urgencyLevel, setUrgencyLevel] = useState("safe");

    useEffect(() => {
        const calculate = () => {
            const created = new Date(createdAt).getTime();
            const expiresAt = created + expiryHours * 60 * 60 * 1000;
            const now = Date.now();
            const remaining = expiresAt - now;

            if (remaining <= 0) {
                setTimeLeft("Expired");
                setUrgencyLevel("expired");
                return;
            }

            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

            // Color-coded urgency
            if (hours < 1) {
                setUrgencyLevel("critical"); // Red — less than 1 hour
            } else if (hours < 3) {
                setUrgencyLevel("warning"); // Yellow — less than 3 hours
            } else {
                setUrgencyLevel("safe"); // Green — plenty of time
            }
        };

        calculate();
        const interval = setInterval(calculate, 1000);
        return () => clearInterval(interval);
    }, [createdAt, expiryHours]);

    const styles = {
        safe: { backgroundColor: "#d1fae5", color: "#065f46", border: "1px solid #10b981" },
        warning: { backgroundColor: "#fef3c7", color: "#92400e", border: "1px solid #f59e0b" },
        critical: { backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #ef4444" },
        expired: { backgroundColor: "#f3f4f6", color: "#6b7280", border: "1px solid #9ca3af" },
    };

    const icons = {
        safe: "🟢",
        warning: "🟡",
        critical: "🔴",
        expired: "⚫",
    };

    return (
        <div
            style={{
                ...styles[urgencyLevel],
                padding: "8px 14px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
            }}
        >
            <span>{icons[urgencyLevel]}</span>
            <span>{urgencyLevel === "expired" ? "Expired" : `Expires in ${timeLeft}`}</span>
        </div>
    );
}
