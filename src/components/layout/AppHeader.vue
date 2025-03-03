<script setup lang="ts">
import { useRoute } from 'vue-router';
import CartIcon from '../cart/CartIcon.vue';
import { computed, ref } from 'vue';

const route = useRoute();
const isMenuOpen = ref(false);

const showCart = computed(() => {
  return true;
});

const isLandingPage = computed(() => {
  return route.path === '/landing';
});

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header class="app-header" :class="{ 'landing-page': isLandingPage }">
    <div class="header-content flex justify-between items-center">
      <div class="logo">
        <router-link to="/" class="logo-link">TestTask</router-link>
      </div>

      <nav class="main-nav flex justify-center" :class="{ 'menu-open': isMenuOpen }">
        <router-link to="/" @click="closeMenu">Animation</router-link>
        <router-link to="/landing" @click="closeMenu">Landing</router-link>
        <router-link to="/catalog" @click="closeMenu">Catalog</router-link>
      </nav>

      <div class="cart-container flex justify-end">
        <CartIcon v-if="showCart" />
      </div>

      <div class="burger-menu">
        <q-btn
          flat
          round
          dense
          :icon="isMenuOpen ? 'close' : 'menu'"
          class="burger-button"
          @click="toggleMenu"
        />
      </div>
    </div>

    <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>
  </header>
</template>


<style scoped>
.app-header.landing-page {
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.7);
}

.app-header.landing-page:has(body:has(.page__menu:target)) {
  opacity: 0;
  pointer-events: none;
}

.header-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem 2rem;
}

.logo {
  flex: 1;
  z-index: 101;
}

.logo-link {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
}

.main-nav {
  flex: 2;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  flex-wrap: wrap;
}

.main-nav a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  padding: var(--spacing-sm) clamp(0.5rem, 1.5vw, 1rem);
  border-radius: var(--radius-md);
  transition:
    background-color var(--transition-fast),
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
  z-index: 101;
}

.burger-menu {
  display: none;
  z-index: 101;
}

.menu-overlay {
  display: none;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0.5rem 1rem;
  }

  .logo {
    flex: 1;
  }

  .burger-menu {
    display: block;
    order: 3;
    margin-left: 1rem;
  }

  .burger-button {
    font-size: 1.2rem;
  }

  .main-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex: none;
    order: 4;
    display: none;
    width: 100%;
    flex-direction: column;
    gap: 0;
    background-color: rgba(255, 255, 255, 0.98);
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
    animation: slideDown 0.3s ease-out;
    z-index: 100;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .main-nav.menu-open {
    display: flex;
  }

  .main-nav a {
    padding: 0.75rem 1rem;
    width: 100%;
    text-align: center;
    border-radius: 0;
    transition: background-color 0.2s;
  }

  .main-nav a:hover,
  .main-nav a.router-link-active {
    background-color: rgba(33, 150, 243, 0.1);
    color: var(--color-primary);
  }

  .cart-container {
    flex: 0;
    order: 2;
  }

  .menu-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>