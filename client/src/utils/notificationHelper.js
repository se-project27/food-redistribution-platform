/**
 * Notification Helper Utility
 * Replaces raw alert() calls with a toast-style notification system.
 */

const NOTIFICATION_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
};

const TYPE_STYLES = {
    success: {
        background: "linear-gradient(135deg, #10b981, #059669)",
        icon: "✅",
        borderColor: "#059669",
    },
    error: {
        background: "linear-gradient(135deg, #ef4444, #dc2626)",
        icon: "❌",
        borderColor: "#dc2626",
    },
    warning: {
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        icon: "⚠️",
        borderColor: "#d97706",
    },
    info: {
        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        icon: "ℹ️",
        borderColor: "#2563eb",
    },
};

// Ensure the notification container exists
function getContainer() {
    let container = document.getElementById("notification-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        Object.assign(container.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: "9999",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "380px",
        });
        document.body.appendChild(container);
    }
    return container;
}

/**
 * Show a toast notification
 * @param {string} message - The notification text
 * @param {string} type - One of: "success", "error", "warning", "info"
 * @param {number} duration - Auto-dismiss duration in ms (default: 3000)
 */
export function showNotification(message, type = "info", duration = 3000) {
    const container = getContainer();
    const style = TYPE_STYLES[type] || TYPE_STYLES.info;

    const toast = document.createElement("div");
    Object.assign(toast.style, {
        background: style.background,
        color: "#fff",
        padding: "14px 20px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        fontSize: "14px",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        opacity: "0",
        transform: "translateX(100%)",
        transition: "all 0.4s ease",
        cursor: "pointer",
        borderLeft: `4px solid ${style.borderColor}`,
    });

    toast.innerHTML = `<span style="font-size:18px">${style.icon}</span><span>${message}</span>`;

    // Click to dismiss
    toast.addEventListener("click", () => dismissToast(toast));

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(0)";
    });

    // Auto-dismiss
    if (duration > 0) {
        setTimeout(() => dismissToast(toast), duration);
    }
}

function dismissToast(toast) {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
}

// Convenience methods
export const notify = {
    success: (msg, duration) => showNotification(msg, NOTIFICATION_TYPES.SUCCESS, duration),
    error: (msg, duration) => showNotification(msg, NOTIFICATION_TYPES.ERROR, duration),
    warning: (msg, duration) => showNotification(msg, NOTIFICATION_TYPES.WARNING, duration),
    info: (msg, duration) => showNotification(msg, NOTIFICATION_TYPES.INFO, duration),
};

export default notify;
