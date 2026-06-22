'use client';

import { useState } from 'react';

export default function ErrorButton() {
  const [error, setError] = useState<Error | null>(null);

  const handleClick = () => {
    setError(new Error('This is a test error!'));
  };

  if (error) throw error;

  return (
    <button
      className="cursor-pointer rounded-xl bg-red-700/40 border border-text text-text px-6 py-2 font-bold hover:bg-red-700/50 transition-all"
      onClick={handleClick}
    >
      Throw error!
    </button>
  );
}
