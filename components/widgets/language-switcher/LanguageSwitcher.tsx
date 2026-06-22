'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const localeNames: Record<string, string> = {
  en: 'English',
  ru: 'Русский',
};

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onSelect = (nextLocale: string) => {
    setOpen(false);
    if (nextLocale === activeLocale) return;
    const query = Object.fromEntries(searchParams.entries());
    startTransition(() => {
      router.replace({ pathname, query }, { locale: nextLocale });
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t('label')}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={isPending}
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer items-center gap-2 rounded-lg bg-accent-light px-3 h-9 font-semibold uppercase text-white shadow-sm transition-colors hover:bg-accent-light/90 disabled:opacity-50"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
        </svg>
        {activeLocale}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute right-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-xl border border-background/20 bg-foreground shadow-2xl"
          >
            {routing.locales.map((locale) => {
              const isActive = locale === activeLocale;
              return (
                <li key={locale} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    lang={locale}
                    onClick={() => onSelect(locale)}
                    className={`flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-accent-light/20 font-bold text-background'
                        : 'font-medium text-background hover:bg-background/10'
                    }`}
                  >
                    <span className="w-7 font-bold uppercase">{locale}</span>
                    {localeNames[locale]}
                    {isActive && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="ml-auto h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
