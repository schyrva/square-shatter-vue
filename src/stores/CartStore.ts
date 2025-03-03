import { defineStore } from 'pinia';
import { useCart } from '../composables/useCart';

export const useCartStore = defineStore('cart', () => {
  const cart = useCart();
  return { ...cart };
});
