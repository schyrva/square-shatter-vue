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

export interface _CartState {
  items: CartItem[];
  isOpen: boolean;
}
