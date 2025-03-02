<script setup lang="ts">
import { useCartStore } from "../../stores/CartStore";

const cartStore = useCartStore();
</script>

<template>
  <q-btn
    flat
    round
    color="primary"
    icon="shopping_cart"
    @click="cartStore.openCart"
  >
    <q-badge v-if="cartStore.totalItems > 0" color="red" floating>
      {{ cartStore.totalItems }}
    </q-badge>
  </q-btn>
</template>
