import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getAllCategories,
} from '../services/api';
import { mapApiProductsToProducts, mapApiProductToProduct } from '../core/productMapper';
import { Product, Category } from '../core/types';

export const productRepository = {
  async fetchAllProducts(): Promise<Product[]> {
    const apiResponse = await getAllProducts();
    return mapApiProductsToProducts(apiResponse.products);
  },
  async fetchProductsByCategory(category: string): Promise<Product[]> {
    const apiResponse = await getProductsByCategory(category);
    return mapApiProductsToProducts(apiResponse.products);
  },
  async fetchProductById(id: number): Promise<Product> {
    const apiProduct = await getProductById(id);
    return mapApiProductToProduct(apiProduct);
  },
  async fetchAllCategories(): Promise<Category[]> {
    return getAllCategories();
  },
};
