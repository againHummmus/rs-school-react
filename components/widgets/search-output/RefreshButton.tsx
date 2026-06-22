'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function RefreshButton({ label }: { label: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => router.refresh())}
      disabled={isPending}
      aria-label={label}
      className="cursor-pointer flex items-center gap-1.5 px-3 h-8 rounded-lg border border-foreground/30 text-white text-sm bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}
