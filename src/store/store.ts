import { create } from 'zustand'

interface Store {
  selectedItems: number[]
  addSelectedItem: (id: number) => void
  removeSelectedItem: (id: number) => void
}

const useStore = create<Store>((set) => ({
  selectedItems: [] as number[],
  addSelectedItem: (id: number) => set((state) => ({ selectedItems: [...state.selectedItems, id] })),
  removeSelectedItem: (id: number) => set((state) => ({ selectedItems: state.selectedItems.filter((item) => item !== id) })),
}))

export default useStore