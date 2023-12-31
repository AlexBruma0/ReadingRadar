import React, { useContext } from 'react';
import { ThemeContext } from './components/ThemeContext';
import { themes } from './themes'; // Importing themes
import { useNavigate } from 'react-router-dom';

const ThemeSwitcher = () => {
  const { setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    navigate('/home');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {Object.entries(themes).map(([name, theme]) => (
        <div 
          key={name}
          onClick={() => handleThemeChange(name)}
          className="cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-110"
          style={{ minHeight: '150px' }}
        >
          <div className="flex h-full">
            <div className="flex-1" style={{ backgroundColor: theme.primary }}></div>
            <div className="flex-1" style={{ backgroundColor: theme.secondary }}></div>
            <div className="flex-1" style={{ backgroundColor: theme.accent }}></div>
          </div>
          <div className="absolute inset-x-0 bottom-0 text-center p-2 bg-opacity-90 bg-white">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
