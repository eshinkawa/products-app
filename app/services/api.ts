import axios from 'axios';
import { ApiProduct, ApiProductResponse, Category } from '../core/types';

const API_BASE_URL = 'https://www.dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'An API error occurred');
  } else {
    console.error('Unexpected Error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export const getAllProducts = async (): Promise<ApiProductResponse> => {
  try {
    const response = await apiClient.get('/products?limit=0');
    return response.data;
  } catch (error) {
    handleApiError(error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
};

export const getProductsByCategory = async (category: string): Promise<ApiProductResponse> => {
  try {
    const response = await apiClient.get(`/products/category/${category}?limit=0`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
};

export const getProductById = async (id: number): Promise<ApiProduct> => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);

    throw error;
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get('/products/categories');

    return response.data as Category[];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};
