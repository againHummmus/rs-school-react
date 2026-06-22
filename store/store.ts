import { create } from 'zustand';
import type { Anime } from '@/components/types';

interface Store {
  selectedItems: Anime[];
  flyoutOpen: boolean;
  addSelectedItem: (item: Anime) => void;
  removeSelectedItem: (item: Anime) => void;
  removeAllSelectedItems: () => void;
  setFlyoutOpen: (open: boolean) => void;
}

const useStore = create<Store>((set) => ({
  selectedItems: [],
  flyoutOpen: false,
  addSelectedItem: (item) =>
    set((state) => ({ selectedItems: [...state.selectedItems, item] })),
  removeSelectedItem: (item) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter(
        (i) => i.mal_id !== item.mal_id
      ),
    })),
  removeAllSelectedItems: () => set({ selectedItems: [] }),
  setFlyoutOpen: (open) => set({ flyoutOpen: open }),
}));

export default useStore;
