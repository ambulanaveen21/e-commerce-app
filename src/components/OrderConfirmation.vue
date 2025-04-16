<template>
  <div>
    <h1>Order Confirmed 🎉 with Oder ID: 192829</h1>
    <p>Your order has been placed successfully! Thank you for shopping with us.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: { Navbar },
}
</script>

<style>
h1 {
  color: green;
}
</style>
