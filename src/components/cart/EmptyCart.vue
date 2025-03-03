<script setup lang="ts">
const emit = defineEmits<{
  (e: 'continueShopping'): void;
}>();
</script>

<template>
  <div class="empty-cart">
    <q-icon name="shopping_cart" class="empty-cart-icon" />
    <p class="empty-cart-message">Your cart is empty</p>
    <q-btn label="Continue Shopping" color="primary" @click="emit('continueShopping')" />
  </div>
</template>

