<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../../stores/CartStore';
import { useQuasar } from 'quasar';
import CartItem from './CartItem.vue';
import CartSummary from './CartSummary.vue';
import EmptyCart from './EmptyCart.vue';
import { useNotification } from '../../composables/useNotification';

const $q = useQuasar();
const cartStore = useCartStore();
const { showNotification } = useNotification();

const visible = computed({
  get: () => cartStore.isOpen,
  set: (value) => {
    if (!value) cartStore.closeCart();
  },
});

function checkout() {
  showNotification('Checkout not implemented in this demo', 'info');
  cartStore.closeCart();
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
        @continue-shopping="cartStore.closeCart"
        @checkout="checkout"
      />
    </q-card>
  </q-dialog>
</template>

<style scoped>
.cart-dialog {
  width: 100%;
  max-width: 500px;
  height: 100%;
}

@media (max-width: 600px) {
  .cart-dialog {
    max-width: 100%;
    width: 100vw;
    margin: 0;
    border-radius: 0;
  }

  .q-card__section {
    padding: 16px;
  }
}
</style>
