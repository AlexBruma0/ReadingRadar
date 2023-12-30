// ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from './components/ThemeContext';

const ThemeSwitcher = () => {
  const { setTheme } = useContext(ThemeContext);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex justify-center items-center space-x-4 py-3 rounded-lg shadow-md bg-gray-100">
      <button 
        onClick={() => handleThemeChange('basic')} 
        className="px-4 py-2 rounded text-gray-800 bg-basic-primary hover:bg-basic-secondary focus:outline-none focus:ring-2 focus:ring-basic-accent"
      >
        Basic
      </button>
      <button 
        onClick={() => handleThemeChange('ysl')} 
        className="px-4 py-2 rounded text-gray-800 bg-ysl-primary hover:bg-ysl-secondary focus:outline-none focus:ring-2 focus:ring-ysl-accent"
      >
        YSL
      </button>
      <button 
        onClick={() => handleThemeChange('gucci')} 
        className="px-4 py-2 rounded text-white bg-gucci-primary hover:bg-gucci-secondary focus:outline-none focus:ring-2 focus:ring-gucci-accent"
      >
        Gucci
      </button>
    </div>
  );
};

export default ThemeSwitcher;
