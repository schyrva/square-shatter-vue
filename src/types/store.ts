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

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartProduct {
  item: CartItem;
  product: Product | undefined;
  total: number;
}
