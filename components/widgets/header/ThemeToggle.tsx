'use client';

import { useContext } from 'react';
import { useTranslations } from 'next-intl';
import { ThemeContext } from '@/context/createContext';
import SunIcon from '../../ui/icons/SunIcon';
import MoonIcon from '../../ui/icons/MoonIcon';

export default function ThemeToggle() {
  const [theme, setTheme] = useContext(ThemeContext);
  const t = useTranslations('Header');

  return theme === 'dark' ? (
    <button
      className="cursor-pointer hover:text-[#b44800] transition-all"
      aria-label={t('toggleTheme')}
      onClick={() => setTheme('light')}
    >
      <SunIcon />
    </button>
  ) : (
    <button
      className="cursor-pointer hover:text-accent-dark transition-all"
      aria-label={t('toggleTheme')}
      onClick={() => setTheme('dark')}
    >
      <MoonIcon />
    </button>
  );
}
