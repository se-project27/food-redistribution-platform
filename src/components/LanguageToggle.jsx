import React, { useState } from "react";

const LanguageToggle = () => {
  const [lang, setLang] = useState("EN");

  return (
    <button onClick={() => setLang(lang === "EN" ? "HI" : "EN")}>
      Language: {lang}
    </button>
  );
};

export default LanguageToggle;
