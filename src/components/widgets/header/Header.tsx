import { NavLink } from 'react-router-dom';
import ErrorButton from '../../ui/error-button/ErrorButton';
import HomeSmileLinearIcon from '~icons/solar/home-smile-linear';

export default function Header({setShowPopup}: {setShowPopup: (value: boolean) => void}) {
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
          <nav className="flex gap-6">
            <button className={'font-semibold text-lg'} onClick={() => setShowPopup(true)}>
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
