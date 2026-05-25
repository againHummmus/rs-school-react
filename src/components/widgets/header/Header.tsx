import { NavLink } from 'react-router-dom';
import ErrorButton from '../../ui/error-button/ErrorButton';
import HomeSmileLinearIcon from '~icons/solar/home-smile-linear';
import Sun2BoldIcon from '~icons/solar/sun-2-bold';
import MoonStarsBoldIcon from '~icons/solar/moon-stars-bold';
import { ThemeContext } from '../../../context/createContext';
import { useContext } from 'react';

export default function Header({setShowFlyout}: {setShowFlyout: (value: boolean) => void}) {
  const [theme, setTheme] = useContext(ThemeContext);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-opacity font-semibold text-lg ${isActive && 'text-accent-dark'}`;

  return (
    <header className="sticky top-0 z-100 flex items-center justify-between px-30 py-3 bg-foreground/40 text-background backdrop-blur-2xl border-b border-foreground/20 pb-4 mb-2">
      <NavLink
        to="/"
        end
        aria-label="Home"
        className={({ isActive }) => `text-3xl transition-opacity ${isActive ? 'text-accent-dark' : 'text-background'}`}
      >
        <HomeSmileLinearIcon/>
      </NavLink>
      <div className="flex flex-row items-center gap-6">
          <nav className="flex gap-6 items-center">
            {theme === 'dark' ? (
              <button className="cursor-pointer hover:text-[#b44800] transition-all" onClick={() => setTheme('light')}><Sun2BoldIcon /></button>
            ) : (
              <button className="cursor-pointer hover:text-accent-dark transition-all" onClick={() => setTheme('dark')}><MoonStarsBoldIcon /></button>
            )}
            <button className={'cursor-pointer font-semibold text-lg'} onClick={() => setShowFlyout(true)}>
              My items
            </button>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </nav>
          <ErrorButton />
      </div>
    </header>
  );
}
