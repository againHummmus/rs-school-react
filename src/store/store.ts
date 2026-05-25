import { create } from 'zustand'
import type { Anime } from '../components/types'

interface Store {
  selectedItems: Anime[]
  addSelectedItem: (item: Anime) => void
  removeSelectedItem: (item: Anime) => void
  removeAllSelectedItems: () => void
}

const useStore = create<Store>((set) => ({
  selectedItems: [] as Anime[],
  addSelectedItem: (item: Anime) => set((state) => ({ selectedItems: [...state.selectedItems, item] })),
  removeSelectedItem: (item: Anime) => set((state) => ({ selectedItems: state.selectedItems.filter((i) => i.mal_id !== item.mal_id) })),
  removeAllSelectedItems: () => set({ selectedItems: [] }),
}))

export default useStore