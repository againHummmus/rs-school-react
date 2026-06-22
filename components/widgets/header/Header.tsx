import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import ActiveLink from '../../ui/active-link/ActiveLink';
import ErrorButton from '../../ui/error-button/ErrorButton';
import HomeIcon from '../../ui/icons/HomeIcon';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import MyItemsButton from './MyItemsButton';

export default async function Header() {
  const t = await getTranslations('Header');

  return (
    <header className="sticky top-0 z-100 flex items-center justify-between px-30 py-3 bg-foreground/40 text-background backdrop-blur-2xl border-b border-foreground/20 pb-4 mb-2">
      <ActiveLink
        href="/"
        aria-label={t('home')}
        className="text-3xl transition-opacity"
        activeClassName="text-accent-dark"
        inactiveClassName="text-background"
      >
        <HomeIcon />
      </ActiveLink>
      <div className="flex flex-row items-center gap-6">
        <nav className="flex gap-6 items-center">
          <ThemeToggle />
          <ActiveLink
            href="/about"
            className="transition-opacity font-semibold text-lg"
            activeClassName="text-accent-dark"
          >
            {t('about')}
          </ActiveLink>
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
        </nav>
        <ErrorButton />
      </div>
    </header>
  );
}
