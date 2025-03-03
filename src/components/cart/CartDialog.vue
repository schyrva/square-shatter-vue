<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCartStore } from '../../stores/CartStore';
import { useQuasar } from 'quasar';
import CartItem from './CartItem.vue';
import CartSummary from './CartSummary.vue';
import EmptyCart from './EmptyCart.vue';
import { useNotificationStore } from '../../stores/NotificationStore';

const $q = useQuasar();
const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const isProcessing = ref(false);

const visible = computed({
  get: () => cartStore.isOpen,
  set: (value) => {
    if (!value) cartStore.closeCart();
  },
});

async function checkout() {
  try {
    isProcessing.value = true;
    // Simulate API call to process checkout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clear cart after successful checkout
    cartStore.clearCart();
    notificationStore.showNotification('Checkout completed successfully!', 'positive');
    cartStore.closeCart();
  } catch (error) {
    console.error('Checkout error:', error);
    notificationStore.showNotification('Failed to process checkout. Please try again.', 'negative');
  } finally {
    isProcessing.value = false;
  }
}
</script>

<template>
  <q-dialog v-model="visible" :maximized="$q.screen.lt.sm" position="right" persistent full-width>
    <q-card class="cart-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Your Cart</div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense @click="cartStore.closeCart" />
      </q-card-section>

      <q-card-section>
        <EmptyCart v-if="cartStore.totalItems === 0" @continue-shopping="cartStore.closeCart" />

        <q-list v-else bordered separator>
          <CartItem
            v-for="item in cartStore.cartProducts"
            :key="item.item.productId"
            :cart-item="item"
            @update-quantity="cartStore.updateQuantity"
            @remove="cartStore.removeFromCart"
          />
        </q-list>
      </q-card-section>

      <CartSummary
        v-if="cartStore.totalItems > 0"
        :total-price="cartStore.totalPrice"
        :is-processing="isProcessing"
        @continue-shopping="cartStore.closeCart"
        @checkout="checkout"
      />
    </q-card>
  </q-dialog>
</template>

<style scoped>
/* Styles moved to global cart.css */
</style>
