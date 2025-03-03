import type { Product } from './product';

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartProduct {
  item: CartItem;
  product: Product | undefined;
  total: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
