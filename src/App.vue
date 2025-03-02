<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import CartDialog from './components/cart/CartDialog.vue';

const route = useRoute();
</script>

<template>
  <!-- Загальний хедер для всіх сторінок -->
  <AppHeader />

  <main>
    <router-view />
  </main>

  <!-- Загальний футер для всіх сторінок (окрім Landing, яка має власний) -->
  <AppFooter v-if="route.name !== 'landing'" />

  <!-- Діалог кошика для всіх сторінок -->
  <CartDialog />
</template>

<style scoped>
main {
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Стиль для компонента router-view, щоб він розширювався на всю доступну висоту */
main > :first-child:not(footer) {
  flex: 1;
}

/* Стиль для футера, щоб він завжди був в нижній частині вмісту */
:deep(.app-footer) {
  margin-top: auto;
  width: 100%;
}
</style>
