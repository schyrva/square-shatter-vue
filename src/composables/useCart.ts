import { ref, computed, watch } from 'vue';
import type { CartItem, Product } from '../types';
import { useProductStore } from '../stores/ProductStore';

export function useCart() {
  const cartItems = ref<CartItem[]>([]);
  const isCartOpen = ref<boolean>(false);
  const productStore = useProductStore();

  // Initialize from localStorage if available
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      cartItems.value = JSON.parse(savedCart);
    } catch (e) {
      console.error('Error parsing cart from localStorage:', e);
    }
  }

  // Persist cart to localStorage when it changes
  watch(
    cartItems,
    (items) => {
      localStorage.setItem('cart', JSON.stringify(items));
    },
    { deep: true }
  );

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const product = productStore.getProductById(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  });

  const cartProducts = computed(() => {
    return cartItems.value.map((item) => {
      const product = productStore.getProductById(item.productId);
      return {
        item,
        product,
        total: (product?.price || 0) * item.quantity,
      };
    });
  });

  function addToCart(productId: number, quantity = 1) {
    const existingItem = cartItems.value.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.value.push({ productId, quantity });
    }
  }

  function removeFromCart(productId: number) {
    const index = cartItems.value.findIndex((item) => item.productId === productId);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = cartItems.value.find((item) => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  function clearCart() {
    cartItems.value = [];
  }

  function openCart() {
    isCartOpen.value = true;
  }

  function closeCart() {
    isCartOpen.value = false;
  }

  return {
    cartItems,
    isCartOpen,
    totalItems,
    totalPrice,
    cartProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };
}
