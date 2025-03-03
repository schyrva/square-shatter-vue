<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import CartDialog from './components/cart/CartDialog.vue';

const route = useRoute();
</script>

<template>
  <AppHeader />

  <main class="flex flex-col">
    <router-view />
  </main>

  <AppFooter v-if="route.name !== 'landing'" />

  <CartDialog />
</template>
