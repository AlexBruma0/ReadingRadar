// ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from './components/ThemeContext';

const ThemeSwitcher = () => {
  const { setTheme } = useContext(ThemeContext);

  const handleThemeChange = (newTheme) => {
    console.log('changed to: ', newTheme)
    setTheme(newTheme);
  };

  return (
    <div className="flex justify-center items-center space-x-4 py-3 bg-gray-100 rounded-lg shadow-md">
      <button 
        onClick={() => handleThemeChange('basic')} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Basic
      </button>
      <button 
        onClick={() => handleThemeChange('ysl')} 
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        YSL
      </button>
      <button 
        onClick={() => handleThemeChange('gucci')} 
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Gucci
      </button>
    </div>
  );
};

export default ThemeSwitcher;
