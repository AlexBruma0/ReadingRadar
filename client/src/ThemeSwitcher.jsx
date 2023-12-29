// ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from './components/ThemeContext';

const ThemeSwitcher = () => {
  const { setTheme } = useContext(ThemeContext);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div>
      <button onClick={() => handleThemeChange('theme1')}>Theme 1</button>
      <button onClick={() => handleThemeChange('theme2')}>Theme 2</button>
      {/* more theme buttons */}
    </div>
  );
};

export default ThemeSwitcher;
