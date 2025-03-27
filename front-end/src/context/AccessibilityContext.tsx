"use client";
import { createContext, useContext, useState } from "react";

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [largeFont, setLargeFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const toggleFontSize = () => setLargeFont(prev => !prev);
  const toggleContrast = () => setHighContrast(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{ largeFont, highContrast, toggleFontSize, toggleContrast }}>
      <div className={`${largeFont ? "text-lg" : ""} ${highContrast ? "contrast" : ""}`}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
