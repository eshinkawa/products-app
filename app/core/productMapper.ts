import { ApiProduct, Product } from './types';

export const mapApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  title: apiProduct.title,
  description: apiProduct.description,
  price: apiProduct.price,
  discountPercentage: apiProduct.discountPercentage,
  rating: apiProduct.rating,
  stock: apiProduct.stock,
  brand: apiProduct.brand,
  category: apiProduct.category,
  thumbnail: apiProduct.thumbnail,
  images: apiProduct.images,
});

export const mapApiProductsToProducts = (apiProducts: ApiProduct[]): Product[] =>
  apiProducts.map(mapApiProductToProduct);
