import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useProductStore } from './ProductStore';
import type { CartItem, CartProduct, _CartState } from '../types/cart';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const isOpen = ref(false);

  const productStore = useProductStore();

  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      items.value = JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }

  watch(
    items,
    (newItems) => {
      localStorage.setItem('cart', JSON.stringify(newItems));
    },
    { deep: true }
  );

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));

  const cartProducts = computed<CartProduct[]>(() =>
    items.value.map((item) => {
      const product = productStore.getProductById(item.productId);
      return {
        item,
        product,
        total: (product?.price || 0) * item.quantity,
      };
    })
  );

  const totalPrice = computed(() => cartProducts.value.reduce((sum, item) => sum + item.total, 0));

  function addToCart(productId: number, quantity = 1) {
    const existingItem = items.value.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ productId, quantity });
    }
  }

  function removeFromCart(productId: number) {
    const index = items.value.findIndex((item) => item.productId === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find((item) => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  function clearCart() {
    items.value = [];
  }

  function openCart() {
    isOpen.value = true;
  }

  function closeCart() {
    isOpen.value = false;
  }

  return {
    items,
    isOpen,
    totalItems,
    cartProducts,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };
});
