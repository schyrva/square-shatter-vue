<script setup lang="ts">
import { useRoute } from "vue-router";
import CartIcon from "./components/cart/CartIcon.vue";
import { computed } from "vue";

const route = useRoute();

const showCart = computed(() => {
  return route.name !== "landing" && route.name !== "catalog";
});

// Визначаємо, чи потрібен скрол на основі поточного маршруту
const needsScroll = computed(() => {
  return route.name === "landing" || route.name === "catalog";
});
</script>

<template>
  <header v-if="route.name !== 'landing'">
    <nav>
      <router-link to="/">Animation</router-link>
      <router-link to="/landing">Landing</router-link>
      <router-link to="/catalog">Catalog</router-link>
    </nav>
    <CartIcon v-if="showCart" />
  </header>

  <main
    :class="{
      'scrollable-main': needsScroll,
      'landing-main': route.name === 'landing',
    }"
  >
    <router-view />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 100;
  padding: var(--spacing-sm) var(--spacing-md);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  gap: clamp(0.3rem, 2vw, 1rem);
  justify-content: center;
  flex-wrap: wrap;
}

nav a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  padding: var(--spacing-sm) clamp(0.5rem, 2vw, 1rem);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
  font-size: var(--font-size-xs);
  white-space: nowrap;
}

nav a:hover,
nav a.router-link-active {
  background-color: #f0f0f0;
}

main {
  padding-top: 60px;
  height: calc(100vh - 60px);
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

/* Спільні стилі для сторінок, що потребують прокрутки */
.scrollable-main {
  overflow: auto;
}

.landing-main {
  padding-top: 0;
  height: 100vh;
  overflow: auto;
}
</style>
