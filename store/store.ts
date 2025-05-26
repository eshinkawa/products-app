import { create } from 'zustand';

type SortByType = 'price' | 'rating' | null;
type SortOrderType = 'asc' | 'desc';

interface ProductFiltersState {
  selectedCategory: string | null;
  sortBy: SortByType;
  sortOrder: SortOrderType;
  setCategory: (category: string | null) => void;
  setSortBy: (sortBy: SortByType) => void;
  setSortOrder: (sortOrder: SortOrderType) => void;
  clearFilters: () => void;
}

export const useProductFiltersStore = create<ProductFiltersState>((set) => ({
  selectedCategory: null,
  sortBy: null,
  sortOrder: 'asc',
  setCategory: (category) => set({ selectedCategory: category }), // Simplified
  setSortBy: (sortBy) => set({ sortBy, sortOrder: 'asc' }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  clearFilters: () => set({ selectedCategory: null, sortBy: null, sortOrder: 'asc' }), // Simplified
}));
