<script setup lang="ts">
import { useRoute } from "vue-router";
import CartIcon from "../cart/CartIcon.vue";
import { computed, ref } from "vue";

const route = useRoute();
const isMenuOpen = ref(false);

// Перевіряємо, чи показувати кошик в хедері
const showCart = computed(() => {
  return true; // Тепер показуємо кошик завжди
});

// Перевіряємо, чи зараз відображається сторінка landing
const isLandingPage = computed(() => {
  return route.path === "/landing";
});

// Функція для перемикання стану меню
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// Функція для закриття меню при кліку на пункт меню
function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header class="app-header" :class="{ 'landing-page': isLandingPage }">
    <div class="header-content">
      <div class="logo">
        <router-link to="/" class="logo-link">TestTask</router-link>
      </div>

      <!-- Навігаційне меню -->
      <nav class="main-nav" :class="{ 'menu-open': isMenuOpen }">
        <router-link to="/" @click="closeMenu">Animation</router-link>
        <router-link to="/landing" @click="closeMenu">Landing</router-link>
        <router-link to="/catalog" @click="closeMenu">Catalog</router-link>
      </nav>

      <div class="cart-container">
        <CartIcon v-if="showCart" />
      </div>

      <!-- Мобільне бургер-меню -->
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

    <!-- Overlay для закриття меню при кліку зовні -->
    <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>
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
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

/* Спеціальні стилі для сторінки landing */
.app-header.landing-page {
  /* Налаштування для запобігання перекриттю з меню landing page */
  z-index: 5; /* Нижчий z-index, ніж у меню landing page (яке має z-index: 10) */

  /* Опціонально: додаткові стилі для кращої видимості на landing page */
  background-color: rgba(255, 255, 255, 0.7);
}

/* На landing page, при відкритому його власному меню, ховаємо глобальний header */
.app-header.landing-page:has(body:has(.page__menu:target)) {
  opacity: 0;
  pointer-events: none;
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
  z-index: 101;
}

.burger-menu {
  display: none;
  z-index: 101;
}

.menu-overlay {
  display: none;
}

/* Стилі для мобільних екранів */
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

@media (max-width: 480px) {
  .header-content {
    padding: 0.5rem 0.8rem;
  }
}
</style>
