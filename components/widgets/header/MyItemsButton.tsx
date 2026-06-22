'use client';

import useStore from '@/store/store';

export default function MyItemsButton({ label }: { label: string }) {
  const setFlyoutOpen = useStore((state) => state.setFlyoutOpen);

  return (
    <button
      className="cursor-pointer font-semibold text-lg"
      onClick={() => setFlyoutOpen(true)}
    >
      {label}
    </button>
  );
}
