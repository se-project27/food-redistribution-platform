import React from "react";

export default function LanguageToggle({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer"
      }}
    >
      {lang === "en" ? "Switch to Hindi" : "Switch to English"}
    </button>
  );
}
