<script setup lang="ts">
import { useRoute } from "vue-router";
import CartIcon from "../cart/CartIcon.vue";
import { computed } from "vue";

const route = useRoute();

// Перевіряємо, чи показувати кошик в хедері
const showCart = computed(() => {
  return true; // Тепер показуємо кошик завжди
});
</script>

<template>
  <header class="app-header">
    <div class="logo">
      <router-link to="/" class="logo-link">TestTask</router-link>
    </div>

    <nav class="main-nav">
      <router-link to="/">Animation</router-link>
      <router-link to="/landing">Landing</router-link>
      <router-link to="/catalog">Catalog</router-link>
    </nav>

    <div class="cart-container">
      <CartIcon v-if="showCart" />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  padding: var(--spacing-sm) var(--spacing-md);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  flex: 1;
}

.logo-link {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
}

.main-nav {
  flex: 2;
  display: flex;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  justify-content: center;
  flex-wrap: wrap;
}

.main-nav a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  padding: var(--spacing-sm) clamp(0.5rem, 1.5vw, 1rem);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast),
    color var(--transition-fast);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.main-nav a:hover,
.main-nav a.router-link-active {
  background-color: var(--color-primary);
  color: white;
}

.cart-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
  }

  .logo,
  .main-nav,
  .cart-container {
    width: 100%;
  }

  .main-nav {
    order: 3;
  }

  .cart-container {
    order: 2;
    justify-content: flex-end;
  }
}
</style>
