<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../../stores/CartStore";
import { useQuasar } from "quasar";

const $q = useQuasar();
const cartStore = useCartStore();

const visible = computed({
  get: () => cartStore.isCartOpen,
  set: (value) => {
    if (!value) cartStore.closeCart();
  },
});

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

function checkout() {
  $q.notify({
    message: "Checkout not implemented in this demo",
    color: "info",
    position: "top",
    timeout: 2000,
    actions: [
      {
        icon: "close",
        color: "white",
        handler: () => {
          /* close */
        },
      },
    ],
  });
  cartStore.closeCart();
}
</script>

<template>
  <q-dialog v-model="visible" maximized position="right" persistent>
    <q-card class="cart-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Your Cart</div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
          @click="cartStore.closeCart"
        />
      </q-card-section>

      <q-card-section>
        <div v-if="cartStore.totalItems === 0" class="empty-cart-message">
          <q-icon name="shopping_cart" size="6rem" color="grey-5" />
          <p>Your cart is empty</p>
          <q-btn
            label="Continue Shopping"
            color="primary"
            @click="cartStore.closeCart"
          />
        </div>

        <q-list v-else bordered separator>
          <q-item
            v-for="item in cartStore.cartProducts"
            :key="item.item.productId"
          >
            <q-item-section avatar>
              <q-img
                :src="item.product?.image"
                style="width: 80px; height: 80px; object-fit: contain"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.product?.name }}</q-item-label>
              <q-item-label caption>{{
                formatPrice(item.product?.price || 0)
              }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="quantity-controls">
                <q-btn
                  flat
                  dense
                  round
                  icon="remove"
                  @click="
                    cartStore.updateQuantity(
                      item.item.productId,
                      item.item.quantity - 1
                    )
                  "
                />
                <span class="quantity">{{ item.item.quantity }}</span>
                <q-btn
                  flat
                  dense
                  round
                  icon="add"
                  @click="
                    cartStore.updateQuantity(
                      item.item.productId,
                      item.item.quantity + 1
                    )
                  "
                />
              </div>
            </q-item-section>

            <q-item-section side>
              <q-item-label>{{ formatPrice(item.total) }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                flat
                dense
                round
                color="negative"
                icon="delete"
                @click="cartStore.removeFromCart(item.item.productId)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section v-if="cartStore.totalItems > 0" class="cart-summary">
        <div class="row justify-between q-mt-md">
          <div class="text-h6">Total:</div>
          <div class="text-h6">{{ formatPrice(cartStore.totalPrice) }}</div>
        </div>
        <div class="row justify-between q-mt-lg">
          <q-btn
            label="Continue Shopping"
            outline
            color="primary"
            @click="cartStore.closeCart"
          />
          <q-btn label="Checkout" color="primary" @click="checkout" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.cart-dialog {
  width: 100%;
  max-width: 500px;
  height: 100%;
}

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

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity {
  width: 30px;
  text-align: center;
}

.cart-summary {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding-top: 1rem;
}

.cart-items {
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
