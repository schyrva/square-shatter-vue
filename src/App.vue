<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import CartDialog from './components/cart/CartDialog.vue';

const route = useRoute();
</script>

<template>
  <AppHeader />

  <main>
    <router-view />
  </main>

  <AppFooter v-if="route.name !== 'landing'" />

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

main > :first-child:not(footer) {
  flex: 1;
}

:deep(.app-footer) {
  margin-top: auto;
  width: 100%;
}
</style>
