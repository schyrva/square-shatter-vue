<script setup lang="ts">
import { useFormatPrice } from '../../composables/useFormatPrice';

const props = defineProps<{
  totalPrice: number;
}>();

const emit = defineEmits<{
  (e: 'continueShopping'): void;
  (e: 'checkout'): void;
}>();

const { formatPrice } = useFormatPrice();
</script>

<template>
  <q-card-section class="cart-summary">
    <div class="row justify-between q-mt-md">
      <div class="text-h6">Total:</div>
      <div class="text-h6">{{ formatPrice(totalPrice) }}</div>
    </div>
    <div class="row justify-between q-mt-lg">
      <q-btn label="Continue Shopping" outline color="primary" @click="emit('continueShopping')" />
      <q-btn label="Checkout" color="primary" @click="emit('checkout')" />
    </div>
  </q-card-section>
</template>

<style scoped>
.cart-summary {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding-top: 1rem;
}

@media (max-width: 600px) {
  .cart-summary {
    position: sticky;
    bottom: 0;
    background: white;
    z-index: 2;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
