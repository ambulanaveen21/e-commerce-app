<template>
  <div>
    <div class="checkout-container">
      <h1>Checkout</h1>
      <div v-if="cart.length > 0">
        <div class="checkout-section">
          <h2>Shipping Information</h2>
          <p><strong>Name:</strong> Naveen Kumar</p>
          <p><strong>Address:</strong> Cyber towers, Hitech city, Hyderabd</p>
          <p><strong>Contact:</strong> +91-8678676234</p>
        </div>

        <!-- Payment Method (Static) -->
        <div class="checkout-section">
          <h2>Payment Method</h2>
          <p>Credit/Debit Card (**** **** **** 1234)</p>
        </div>

        <!-- Order Summary -->
        <div class="checkout-section">
          <h2>Order Summary</h2>
          <ul class="order-summary">
            <li v-for="item in cart" :key="item.id">
              {{ item.name }} - ${{ item.price }} x {{ item.quantity }}
            </li>
          </ul>
          <h3>Total: ${{ total }}</h3>
        </div>

        <button @click="confirmOrder" class="place-order-btn">Place Order</button>
      </div>

      <p v-else class="empty-cart-message">Your cart is empty.</p>
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
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
  },
  methods: {
    confirmOrder() {
      alert('Order placed successfully!')
      this.$store.commit('clearCart')
      this.$router.push('/order-confirmation')
    },
  },
}
</script>

<style scoped>
.checkout-container {
  max-width: 700px;
  margin: 20px auto;
  padding: 10px;
}

h1,
h2 {
  color: #333;
  margin-bottom: 10px;
}

.checkout-section {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
}

p {
  font-size: 14px;
  color: #555;
  margin: 5px 0;
}

.order-summary {
  list-style-type: none;
  padding: 0;
}

.order-summary li {
  font-size: 14px;
  padding: 5px 0;
}

.place-order-btn {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
}

.place-order-btn:hover {
  background-color: #0056b3;
}

.empty-cart-message {
  text-align: center;
  color: #999;
  font-size: 16px;
  margin-top: 20px;
}
</style>
