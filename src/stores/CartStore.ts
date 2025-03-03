import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useProductStore } from './ProductStore';
import type { CartItem, CartProduct, CartState } from '../types/cart';

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([]);
  const isOpen = ref(false);

  // Product store
  const productStore = useProductStore();

  // Initialize cart from localStorage
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      items.value = JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }

  // Watch for changes and save to localStorage
  watch(
    items,
    (newItems) => {
      localStorage.setItem('cart', JSON.stringify(newItems));
    },
    { deep: true }
  );

  // Getters
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

  // Actions
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
    // State
    items,
    isOpen,
    // Getters
    totalItems,
    cartProducts,
    totalPrice,
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };
});
