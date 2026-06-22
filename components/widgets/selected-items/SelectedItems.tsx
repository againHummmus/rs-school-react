'use client';

import { useTranslations } from 'next-intl';
import MiniCard from '../../ui/mini-card/MiniCard';
import useStore from '@/store/store';

export default function SelectedItems() {
  const t = useTranslations('SelectedItems');
  const selectedItems = useStore((state) => state.selectedItems);
  const flyoutOpen = useStore((state) => state.flyoutOpen);
  const removeAllSelectedItems = useStore(
    (state) => state.removeAllSelectedItems
  );

  if (!flyoutOpen && selectedItems.length === 0) return null;

  return (
    <div className="sticky bottom-0 z-50 w-full rounded-t-2xl border-t border-foreground/30 bg-foreground/95 backdrop-blur-md p-6 shadow-2xl">
      <div className="container flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-background font-display">
              {t('title')}
            </h2>
            <span className="text-sm font-semibold text-background/60 bg-background/10 rounded-full px-2.5 py-0.5">
              {selectedItems.length}
            </span>
          </div>
        </div>

        <ul className="max-h-75 overflow-y-scroll no-scrollbar flex flex-col gap-2">
          {selectedItems.map((item) => (
            <MiniCard key={item.mal_id} {...item} />
          ))}
        </ul>

        <div className="flex gap-3">
          <form action="/api/csv" method="post">
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(selectedItems)}
            />
            <button
              type="submit"
              className="cursor-pointer h-10 px-6 bg-accent-dark text-foreground rounded-lg hover:bg-accent-dark/90 transition-all font-semibold disabled:opacity-40 disabled:pointer-events-none"
              disabled={selectedItems.length === 0}
            >
              {t('download')}
            </button>
          </form>
          <button
            type="button"
            className="cursor-pointer h-10 px-6 border border-background/30 text-background rounded-lg hover:bg-background/10 transition-all font-semibold disabled:opacity-40 disabled:pointer-events-none"
            disabled={selectedItems.length === 0}
            onClick={removeAllSelectedItems}
          >
            {t('deselectAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
