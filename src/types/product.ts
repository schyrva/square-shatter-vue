export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  rating: number;
}

export interface ProductFilters {
  category: string;
  searchQuery: string;
  sortBy: string;
}

export interface _ProductState {
  products: Product[];
  filters: ProductFilters;
}
