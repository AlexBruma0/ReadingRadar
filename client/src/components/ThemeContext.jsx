// ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "aqua", // Use stored theme or default
  );

  useEffect(() => {
    localStorage.setItem("theme", theme); // Update local storage when theme changes
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
