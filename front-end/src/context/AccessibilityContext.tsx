// "use client";
// import { createContext, useContext, useState } from "react";

// const AccessibilityContext = createContext(null);

// export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
//   const [largeFont, setLargeFont] = useState(false);
//   const [highContrast, setHighContrast] = useState(false);

//   const toggleFontSize = () => setLargeFont(prev => !prev);
//   const toggleContrast = () => setHighContrast(prev => !prev);

//   return (
//     <AccessibilityContext.Provider value={{ largeFont, highContrast, toggleFontSize, toggleContrast }}>
//       <div className={`${largeFont ? "text-lg" : ""} ${highContrast ? "contrast" : ""}`}>
//         {children}
//       </div>
//     </AccessibilityContext.Provider>
//   );
// };

// export const useAccessibility = () => useContext(AccessibilityContext);

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AccessibilityContextType = {
  largeFont: boolean;
  highContrast: boolean;
  toggleFontSize: () => void;
  toggleContrast: () => void;
};

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const AccessibilityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [largeFont, setLargeFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const storedFont = localStorage.getItem("largeFont");
    const storedContrast = localStorage.getItem("highContrast");

    if (storedFont) setLargeFont(storedFont === "true");
    if (storedContrast) setHighContrast(storedContrast === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("largeFont", largeFont.toString());
    localStorage.setItem("highContrast", highContrast.toString());

    const body = document.body;

    if (largeFont) {
      body.classList.add("text-lg", "md:text-xl");
    } else {
      body.classList.remove("text-lg", "md:text-xl");
    }

    if (highContrast) {
      body.classList.add("contrast-mode");
    } else {
      body.classList.remove("contrast-mode");
    }
  }, [largeFont, highContrast]);

  const toggleFontSize = () => setLargeFont((prev) => !prev);
  const toggleContrast = () => setHighContrast((prev) => !prev);

  return (
    <AccessibilityContext.Provider
      value={{ largeFont, highContrast, toggleFontSize, toggleContrast }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
};
