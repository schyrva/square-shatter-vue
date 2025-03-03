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
