import { Outlet } from 'react-router-dom';
import Header from '../../components/widgets/header/Header';
import { useState } from 'react';
import SelectedItems from '../../components/widgets/selected-items/SelectedItems';
import {ThemeContext} from '../../context/createContext';
import useStore from '../../store/store';

export default function Layout() {
  const [theme, setTheme] = useState('light');
  const [showFlyout, setShowFlyout] = useState(false);
  const selectedItems = useStore((state) => state.selectedItems);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className={`min-h-screen flex flex-col bg-main-background/50 text-foreground transition-colors ${theme === 'dark' ? 'dark' : 'light'}`}>
        <Header setShowFlyout={setShowFlyout} />
        <div className="container my-8 lg:my-12">
          <Outlet />
        </div>
        {(showFlyout || selectedItems.length > 0) && <SelectedItems />}
      </div>
    </ThemeContext.Provider>
  );
}
