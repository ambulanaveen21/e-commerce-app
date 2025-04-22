<template>
  <div class="checkout-container">
    <h1>Checkout</h1>

    <div v-if="cart.length > 0">
      <!-- Shipping Info -->
      <div class="form-group" v-for="field in ['name', 'address', 'contact']" :key="field">
        <label :for="field">{{ field.charAt(0).toUpperCase() + field.slice(1) }}</label>
        <input
          v-model.trim="shipping[field]"
          :id="field"
          :type="field === 'contact' ? 'tel' : 'text'"
          :class="{ 'input-error': errors[field] }"
        />
        <span class="error-msg" v-if="errors[field]">{{ errors[field] }}</span>
      </div>

      <!-- Payment Method -->
      <div class="checkout-section">
        <h2>Payment Method</h2>
        <select v-model="paymentMethod">
          <option disabled value="">Select Payment Method</option>
          <option value="card">Debit/Credit Card</option>
          <option value="paypal">PayPal UPI</option>
        </select>
        <span v-if="submitted && !paymentMethod" class="error">Please choose a payment method</span>

        <!-- Card Fields -->
        <div v-if="paymentMethod === 'card'" class="payment-fields">
          <label>
            Card Number:
            <input v-model.trim="card.number" maxlength="16" type="tel" autocomplete="cc-number" />
            <span v-if="submitted && !/^\d{16}$/.test(card.number)" class="error">
              Must be 16 digits
            </span>
          </label>
          <label>
            Expiry:
            <input
              v-model.trim="card.expiry"
              placeholder="MM/YY"
              type="text"
              autocomplete="cc-exp"
            />
            <span v-if="submitted && !/^\d{2}\/\d{2}$/.test(card.expiry)" class="error">
              Invalid format
            </span>
          </label>
          <label>
            CVV:
            <input v-model.trim="card.cvv" maxlength="3" type="password" autocomplete="cc-csc" />
            <span v-if="submitted && !/^\d{3}$/.test(card.cvv)" class="error">
              Must be 3 digits
            </span>
          </label>
        </div>

        <!-- PayPal -->
        <div v-if="paymentMethod === 'paypal'" class="payment-fields">
          <label>
            UPI ID:
            <input v-model.trim="upi" placeholder="e.g. naveen@hdfc" type="text" />
            <span v-if="submitted && !isValidUpi" class="error">Invalid UPI ID</span>
          </label>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="checkout-section">
        <h2>Order Summary</h2>
        <ul class="order-summary">
          <li v-for="item in cart" :key="item.id" class="summary-item">
            <div class="summary-line">
              <strong>{{ item.name }}</strong>
              <span>{{ item.quantity }} x ₹{{ item.price.toFixed(2) }}</span>
            </div>
          </li>
        </ul>

        <hr />
        <div class="summary-totals">
          <div class="summary-line">
            <span>Shipping</span>
            <span>₹{{ shippingCost.toFixed(2) }}</span>
          </div>
          <div class="summary-line">
            <span>Tax (10%)</span>
            <span>₹{{ totalTax.toFixed(2) }}</span>
          </div>
          <div class="summary-line total-amount">
            <strong>Total Amount</strong>
            <strong>₹{{ totalWithTax.toFixed(2) }}</strong>
          </div>
        </div>
      </div>

      <!-- Place Order -->
      <button :disabled="isSubmitting" @click="confirmOrder" class="place-order-btn">
        {{ isSubmitting ? 'Placing Order...' : 'Place Order' }}
      </button>
    </div>

    <p v-else class="empty-cart-message">Your cart is empty.</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      shipping: {
        name: '',
        address: '',
        contact: '',
      },
      errors: {},
      paymentMethod: '',
      card: {
        number: '',
        expiry: '',
        cvv: '',
      },
      upi: '',
      submitted: false,
      isSubmitting: false,
      shippingCost: 50,
    }
  },
  computed: {
    ...mapState(['cart']),
    isValidUpi() {
      return /^[\w.-]+@[\w.-]+$/.test(this.upi)
    },
    totalWithTax() {
      const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return subtotal + this.totalTax + this.shippingCost
    },
    totalTax() {
      const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return subtotal * 0.1
    },
  },
  methods: {
    ...mapActions(['placeOrder']),
    confirmOrder() {
      this.submitted = true
      this.errors = {}
      this.isSubmitting = true

      const { name, address, contact } = this.shipping

      // Basic required check
      if (!name) this.errors.name = 'Name is required'
      if (!address) this.errors.address = 'Address is required'
      if (!contact) {
        this.errors.contact = 'Contact is required'
      } else if (!/^\d{10}$/.test(contact)) {
        this.errors.contact = 'Contact must be a 10-digit number'
      }

      if (!this.paymentMethod) {
        this.errors.paymentMethod = 'Payment method is required'
      }

      if (this.paymentMethod === 'card') {
        if (!/^\d{16}$/.test(this.card.number))
          this.errors.cardNumber = 'Card number must be 16 digits'
        if (!/^\d{2}\/\d{2}$/.test(this.card.expiry))
          this.errors.cardExpiry = 'Expiry must be MM/YY'
        if (!/^\d{3}$/.test(this.card.cvv)) this.errors.cardCvv = 'CVV must be 3 digits'
      }

      if (this.paymentMethod === 'paypal' && !this.isValidUpi) {
        this.errors.upi = 'Invalid UPI ID'
      }

      if (Object.keys(this.errors).length > 0) {
        this.isSubmitting = false
        return
      }

      this.placeOrder({
        shipping: this.shipping,
        payment: {
          method: this.paymentMethod,
          ...(this.paymentMethod === 'card' ? this.card : { upi: this.upi }),
        },
        cart: this.cart,
        total: this.totalWithTax,
      })

      this.isSubmitting = false
      this.$router.push('/order-confirmation')
    },
  },
}
</script>

<style scoped>
.checkout-container {
  max-width: 950px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  color: #2a2a2a;
  margin-bottom: 30px;
}

.checkout-section {
  margin-bottom: 35px;
}

h2 {
  font-size: 1.6rem;
  color: #333333;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  color: #444444;
  margin-bottom: 6px;
  display: block;
}

input,
select {
  padding: 12px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #cccccc;
  width: 100%;
  box-sizing: border-box;
  background-color: #f9f9f9;
}

input:focus,
select:focus {
  border-color: #555555;
  outline: none;
  background-color: #ffffff;
}

.input-error {
  border-color: #d9534f !important;
}

.error-msg,
.error {
  font-size: 13px;
  color: #d9534f;
  margin-top: 5px;
}

.payment-fields {
  margin-top: 15px;
}

.order-summary {
  font-size: 14px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.summary-item {
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.summary-details {
  font-size: 13px;
  color: #666666;
  padding-left: 5px;
}

.summary-totals {
  margin-top: 20px;
  font-size: 15px;
}

.total-amount {
  font-size: 1.3rem;
  font-weight: bold;
  color: #3c763d;
  margin-top: 10px;
  border-top: 1px solid #dddddd;
  padding-top: 10px;
}

.place-order-btn {
  width: 100%;
  padding: 16px;
  font-size: 1.125rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 30px;
  transition: background-color 0.3s ease;
}

.place-order-btn:hover {
  background-color: #45a049;
}

.place-order-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.empty-cart-message {
  text-align: center;
  font-size: 1.1rem;
  color: #888888;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .checkout-container {
    padding: 20px;
  }

  h1 {
    font-size: 1.8rem;
  }

  .place-order-btn {
    font-size: 1rem;
    padding: 14px;
  }

  .summary-totals {
    font-size: 14px;
  }
}
</style>
