<template>
  <div>
    <div class="cart-container">
      <h1 class="cart-title">Your Cart</h1>

      <div v-if="cart.length > 0">
        <div class="cart-items">
          <div v-for="(item, index) in cart" :key="index" class="cart-item">
            <img :src="item.image" :alt="item.name" class="cart-item-image" />
            <div class="cart-item-details">
              <h3>{{ item.name }}</h3>
              <p>Price: ${{ item.price.toFixed(2) }}</p>
              <div class="quantity-controls">
                <button @click="decreaseQuantity(index)" :disabled="item.quantity === 1">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(index)">+</button>
              </div>
              <p class="item-total">Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
              <button @click="removeFromCart(index)" class="remove-button">Remove</button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <h2 class="summary-title">PRICE DETAILS</h2>

          <div class="summary-row">
            <span>Price ({{ totalItems }} items)</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>

          <div class="summary-row">
            <span>Discount (5%)</span>
            <span class="discount">- ${{ discount.toFixed(2) }}</span>
          </div>

          <div class="summary-row">
            <span>Tax (10%)</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>

          <div class="summary-row total-row">
            <span><strong>Total including Taxes & Shipping</strong></span>
            <span
              ><strong>${{ totalIncludingTaxesShipping.toFixed(2) }}</strong></span
            >
          </div>

          <p class="savings-note">You will save ${{ discount.toFixed(2) }} on this order</p>
        </div>

        <button @click="checkout" class="checkout-button">Proceed to Checkout</button>
      </div>

      <p v-else class="empty-cart">Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './Navbar.vue'

export default {
  components: { Navbar },
  computed: {
    ...mapState(['cart']),
    subtotal() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    discount() {
      // Example: flat 5% discount
      return this.subtotal * 0.05
    },

    tax() {
      return (this.subtotal - this.discount) * 0.1
    },

    shipping() {
      return this.subtotal - this.discount > 500 ? 0 : 40
    },

    totalIncludingTaxesShipping() {
      return this.subtotal - this.discount + this.tax + this.shipping
    },

    totalItems() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0)
    },
  },
  methods: {
    increaseQuantity(index) {
      this.$store.commit('updateQuantity', { index, amount: 1 })
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.$store.commit('updateQuantity', { index, amount: -1 })
      }
    },
    removeFromCart(index) {
      this.$store.commit('removeFromCart', index)
    },
    checkout() {
      this.$router.push('/checkout')
    },
  },
}
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 80px auto 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

.cart-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.empty-cart {
  font-size: 18px;
  color: #888;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 15px;
}

.cart-item-details {
  flex: 1;
  text-align: left;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-controls button:hover {
  background: #0056b3;
}

.item-total {
  font-weight: bold;
  margin-top: 5px;
}

.remove-button {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background: #cc0000;
}

.cart-summary {
  margin-top: 20px;
  text-align: left;
  border-top: 2px solid #ddd;
  padding-top: 15px;
  width: 100%;
  box-sizing: border-box;
}

.cart-summary p {
  font-size: 16px;
  margin: 5px 0;
}

.checkout-button {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
}

.checkout-button:hover {
  background: #218838;
}

.quantity-controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.cart-summary {
  margin-top: 20px;
  text-align: left;
  border-top: 2px solid #ddd;
  padding-top: 15px;
  line-height: 1.6;
  width: 100%;
  box-sizing: border-box;
}

.cart-summary h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.cart-summary p {
  font-size: 15px;
  margin: 10px 0;
}

.cart-summary {
  border: 1px solid #ddd;
  padding: 16px;
  width: 100%;
  background-color: #fafafa;
  box-sizing: border-box;
}

.summary-title {
  font-weight: bold;
  margin-bottom: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}

.total-row {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 10px;
}

.discount {
  color: green;
}
</style>
