import React, { createContext, useState } from "react";

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [language, setLanguage] = useState("EN");
  const [contrast, setContrast] = useState(false);

  return (
    <AccessibilityContext.Provider
      value={{ language, setLanguage, contrast, setContrast }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
