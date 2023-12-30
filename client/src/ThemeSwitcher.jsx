import React, { useContext } from 'react';
import { ThemeContext } from './components/ThemeContext';
import { themes } from './themes'; // Importing themes

const ThemeSwitcher = () => {
  const { setTheme } = useContext(ThemeContext);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 py-3 rounded-lg shadow-md bg-gray-100">
      <button 
        onClick={() => handleThemeChange('basic')} 
        className="w-full px-4 py-2"
        style={{ 
          backgroundColor: themes.basic.primary, 
          borderColor: themes.basic.accent,
          color: themes.basic.secondary,
          ':hover': { backgroundColor: themes.basic.secondary }
        }}
      >
        Basic
      </button>
      <button 
        onClick={() => handleThemeChange('ysl')} 
        className="w-full px-4 py-2 text-white"
        style={{ 
          backgroundColor: themes.ysl.primary, 
          borderColor: themes.ysl.accent,
          ':hover': { backgroundColor: themes.ysl.secondary }
        }}
      >
        YSL
      </button>
      <button 
        onClick={() => handleThemeChange('gucci')} 
        className="w-full px-4 py-2 text-white "
        style={{ 
          backgroundColor: themes.gucci.primary, 
          borderColor: themes.gucci.accent,
          ':hover': { backgroundColor: themes.gucci.secondary }
        }}
      >
        Gucci
      </button>
    </div>
  );
};

export default ThemeSwitcher;
