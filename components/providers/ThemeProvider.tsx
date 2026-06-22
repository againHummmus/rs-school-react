'use client';

import { useState, type ReactNode } from 'react';
import { ThemeContext } from '@/context/createContext';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <main
        className={`min-h-screen flex flex-col text-foreground transition-colors ${
          theme === 'dark' ? 'dark' : 'light'
        }`}
      >
        {children}
      </main>
    </ThemeContext.Provider>
  );
}
