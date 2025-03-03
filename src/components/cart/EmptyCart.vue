<script setup lang="ts">
const emit = defineEmits<{
  (e: 'continueShopping'): void;
}>();
</script>

<template>
  <div class="empty-cart-message">
    <q-icon name="shopping_cart" size="6rem" color="grey-5" />
    <p>Your cart is empty</p>
    <q-btn label="Continue Shopping" color="primary" @click="emit('continueShopping')" />
  </div>
</template>

<style scoped>
.empty-cart-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
}

.empty-cart-message p {
  font-size: 1.2em;
  margin: 1rem 0;
  color: var(--color-text);
}
</style>
