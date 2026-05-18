import { NavLink } from 'react-router-dom';
import ErrorButton from './ui/ErrorButton';

export default function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-opacity font-semibold text-lg ${isActive ? 'text-accent' : 'text-text/60 hover:text-text'}`;

  return (
    <header className="sticky top-0 z-100 flex items-center justify-between px-30 py-3 bg-background/5 backdrop-blur-2xl border-b border-foreground/20 pb-4 mb-2">
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <div className="flex flex-row items-center gap-6">
          <nav className="flex gap-6">
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </nav>
          <ErrorButton />
      </div>
    </header>
  );
}
