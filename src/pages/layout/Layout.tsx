import { Outlet } from 'react-router-dom';
import Header from '../../components/widgets/header/Header';
import { useState } from 'react';
import SelectedItems from '../../components/widgets/selected-items/SelectedItems';
import {ThemeContext} from '../../context/createContext';

export default function Layout() {
  const [theme, setTheme] = useState('light');
  const [showPopup, setShowPopup] = useState(false);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className={`min-h-screen flex flex-col bg-main-background/50 text-foreground transition-colors ${theme === 'dark' ? 'dark' : 'light'}`}>
        <Header setShowPopup={setShowPopup} />
        <div className="container my-8 lg:my-12">
          <Outlet />
        </div>
        {showPopup && <SelectedItems setShowPopup={setShowPopup} />}
      </div>
    </ThemeContext.Provider>
  );
}
