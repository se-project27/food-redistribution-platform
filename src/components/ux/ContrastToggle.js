import React from "react";

export default function ContrastToggle({ highContrast, setHighContrast }) {
  return (
    <button
      onClick={() => setHighContrast(!highContrast)}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer"
      }}
    >
      {highContrast ? "Normal Mode" : "High Contrast"}
    </button>
  );
}
