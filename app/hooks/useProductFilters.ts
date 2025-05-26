import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useProductFiltersStore } from '~/store/store';
import { productRepository } from '../repositories/producRepository';

export function useProductFilters() {
  const { selectedCategory, sortBy, sortOrder, setCategory } = useProductFiltersStore();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: productRepository.fetchAllCategories,
  });

  const productsQuery = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () =>
      selectedCategory
        ? productRepository.fetchProductsByCategory(selectedCategory)
        : productRepository.fetchAllProducts(),
  });

  const sortedProducts = useMemo(() => {
    if (!productsQuery.data) return [];
    const prods = [...productsQuery.data];
    if (sortBy) {
      prods.sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'price') comparison = a.price - b.price;
        else if (sortBy === 'rating') comparison = a.rating - b.rating;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }
    return prods;
  }, [productsQuery.data, sortBy, sortOrder]);

  return {
    selectedCategory,
    sortBy,
    sortOrder,
    setCategory,
    modalVisible,
    setModalVisible,
    categoriesData,
    isLoadingCategories,
    errorCategories,
    productsQuery,
    sortedProducts,
  };
}
