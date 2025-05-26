export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ApiProductResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}
export interface Category {
  slug: string;
  name: string;
  url: string;
}

export type Product = ApiProduct;
