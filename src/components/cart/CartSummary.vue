<script setup lang="ts">
import { useFormatPrice } from '../../composables/useFormatPrice';

const props = defineProps<{
  totalPrice: number;
  isProcessing?: boolean;
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
      <q-btn
        label="Continue Shopping"
        outline
        color="primary"
        :disable="props.isProcessing"
        @click="emit('continueShopping')"
      />
      <q-btn
        :label="props.isProcessing ? 'Processing...' : 'Checkout'"
        color="primary"
        :loading="props.isProcessing"
        :disable="props.isProcessing"
        @click="emit('checkout')"
      />
    </div>
  </q-card-section>
</template>

<style scoped>
/* Styles moved to global ui-components.css */
</style>
