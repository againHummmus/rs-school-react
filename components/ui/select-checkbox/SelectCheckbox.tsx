'use client';

import useStore from '@/store/store';
import type { Anime } from '@/components/types';

export default function SelectCheckbox({ anime }: { anime: Anime }) {
  const isSelected = useStore((state) =>
    state.selectedItems.some((i) => i.mal_id === anime.mal_id)
  );
  const addSelectedItem = useStore((state) => state.addSelectedItem);
  const removeSelectedItem = useStore((state) => state.removeSelectedItem);

  return (
    <div
      className="absolute top-4 right-4 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) =>
          e.target.checked ? addSelectedItem(anime) : removeSelectedItem(anime)
        }
        className="w-4 h-4 cursor-pointer accent-background rounded"
      />
    </div>
  );
}
