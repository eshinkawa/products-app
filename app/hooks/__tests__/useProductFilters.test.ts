import { renderHook, act } from '@testing-library/react-hooks/native';
import { useProductFilters } from '~/app/hooks/useProductFilters';
import { queryClientWrapper } from '~/app/test-utils/queryClientWrapper';

jest.mock('../../repositories/producRepository', () => ({
  productRepository: {
    fetchAllCategories: jest.fn().mockResolvedValue([
      { slug: 'cat1', name: 'Category 1', url: '' },
      { slug: 'cat2', name: 'Category 2', url: '' },
    ]),
    fetchAllProducts: jest.fn().mockResolvedValue([
      {
        id: 1,
        price: 10,
        rating: 4,
        title: '',
        description: '',
        discountPercentage: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
      },
      {
        id: 2,
        price: 20,
        rating: 5,
        title: '',
        description: '',
        discountPercentage: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
      },
    ]),
    fetchProductsByCategory: jest.fn().mockResolvedValue([
      {
        id: 3,
        price: 15,
        rating: 3,
        title: '',
        description: '',
        discountPercentage: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
      },
    ]),
  },
}));

describe('useProductFilters', () => {
  it('should initialize with default values', async () => {
    const { result, waitFor } = renderHook(() => useProductFilters(), {
      wrapper: queryClientWrapper(),
    });
    await waitFor(() => !result.current.isLoadingCategories);
    expect(result.current.selectedCategory).toBeNull();
    expect(result.current.sortBy).toBeNull();
    expect(result.current.sortOrder).toBe('asc');
    expect(result.current.modalVisible).toBe(false);
    expect(result.current.categoriesData).toBeDefined();
    expect(Array.isArray(result.current.sortedProducts)).toBe(true);
  });

  it('should set modalVisible to true/false', () => {
    const { result } = renderHook(() => useProductFilters(), { wrapper: queryClientWrapper() });
    act(() => result.current.setModalVisible(true));
    expect(result.current.modalVisible).toBe(true);
    act(() => result.current.setModalVisible(false));
    expect(result.current.modalVisible).toBe(false);
  });

  it('should update selectedCategory and fetch products by category', async () => {
    const { result, waitFor } = renderHook(() => useProductFilters(), {
      wrapper: queryClientWrapper(),
    });
    await waitFor(() => !result.current.isLoadingCategories);
    act(() => result.current.setCategory('cat1'));
    expect(result.current.selectedCategory).toBe('cat1');
  });
});
