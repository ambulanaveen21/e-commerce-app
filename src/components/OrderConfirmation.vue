<template>
  <div class="order-confirmation">
    <div class="confirmation-header">
      <img src="https://img.icons8.com/color/96/000000/checked--v2.png" alt="Success Icon" />
      <h1>Thank you for your order!</h1>
      <p>Your order has been placed successfully.</p>
      <p class="order-id">
        Order ID: <strong>#{{ order.orderId }}</strong>
      </p>
    </div>

    <div v-if="order">
      <!-- Order Summary -->
      <section class="order-card">
        <h2>🛍️ Order Summary</h2>
        <ul class="order-items">
          <li v-for="item in order.cart" :key="item.id">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-qty-price">{{ item.quantity }} × ₹{{ item.price }}</div>
          </li>
        </ul>
        <p class="order-total">Total Paid: ₹{{ order.total }}</p>
      </section>

      <!-- Shipping Info -->
      <section class="order-card">
        <h2>🚚 Shipping Information</h2>
        <p><strong>Name:</strong> {{ order.shipping.name }}</p>
        <p><strong>Address:</strong> {{ order.shipping.address }}</p>
        <p><strong>Contact:</strong> {{ order.shipping.contact }}</p>
      </section>

      <!-- Payment Info -->
      <section class="order-card">
        <h2>💳 Payment Method</h2>
        <p>
          <strong>Method:</strong> <span class="capitalize">{{ order.payment.method }}</span>
        </p>
        <p v-if="order.payment.method === 'card'">
          Card ending in ****{{ order.payment.number.slice(-4) }}
        </p>
        <p v-if="order.payment.method === 'paypal'">UPI: {{ order.payment.upi }}</p>
      </section>

      <!-- Delivery Date -->
      <section class="order-card">
        <h2>📦 Estimated Delivery</h2>
        <p>{{ formattedDate(order.estimatedDeliveryDate) }}</p>
      </section>

      <router-link to="/" class="home-button">🏠 Back to Home</router-link>
    </div>

    <div v-else class="no-order">
      <p>No recent order found.</p>
      <router-link to="/" class="home-button">🏠 Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['orderDetails']),
    order() {
      return this.orderDetails
    },
  },
  methods: {
    formattedDate(date) {
      return new Date(date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
.order-confirmation {
  max-width: 750px;
  margin: 2rem auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.confirmation-header {
  text-align: center;
  margin-bottom: 2rem;
}
.confirmation-header h1 {
  color: #2e7d32;
  margin: 0.5rem 0;
}
.confirmation-header p {
  color: #555;
}
.order-id {
  margin-top: 0.5rem;
  font-weight: 500;
  color: #444;
}

.order-card {
  border: 1px solid #eee;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background: #fafafa;
}
.order-card h2 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #444;
}

.order-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
.order-items li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}
.item-name {
  font-weight: 500;
}
.item-qty-price {
  font-weight: 400;
  color: #555;
}

.order-total {
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 1rem;
  text-align: right;
}

.capitalize {
  text-transform: capitalize;
}

.home-button {
  display: inline-block;
  margin-top: 1.5rem;
  background: #2e7d32;
  color: #fff;
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s;
}
.home-button:hover {
  background: #1b5e20;
}

.no-order {
  text-align: center;
  color: #999;
}
</style>
