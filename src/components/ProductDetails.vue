<template>
  <div class="product-container">
    <div class="content">
      <div class="product-card" v-if="product">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-price">$ {{ product.price }}</p>
          <p class="product-description">{{ product.description }}</p>
          <button class="add-to-cart-btn" @click="addToCart">🛒 Add to Cart</button>
        </div>
      </div>
      <div v-else class="loading">Loading product details...</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      product: null,
    }
  },
  computed: {
    ...mapGetters(['getProducts']),
    ...mapState(['cart', 'user']),
    isLoggedIn() {
      return this.user !== null
    },
  },
  methods: {
    ...mapActions(['fetchProducts']),
    addToCart() {
      if (this.isLoggedIn) {
        this.$store.commit('addToCart', this.product)
        alert('✅ Product added to cart!')
        this.$router.push('/cart')
      } else {
        alert('Please log in first.')
        this.$router.push('/login')
      }
    },
  },
  async created() {
    const productId = this.$route.params.id
    if (!this.getProducts.length) {
      await this.fetchProducts()
    }
    this.product = this.getProducts.find((p) => p.id == productId)
    if (!this.product) {
      alert('⚠️ Product not found!')
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 30px 10px;
  min-height: 100vh;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 400px; /* reduced from 600px */
}

.product-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  padding: 16px; /* reduced from 20px */
  text-align: center;
  margin: 0 auto;
}

.product-image {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 12px;
}

.product-title {
  font-size: 20px; /* smaller */
  margin-bottom: 8px;
}

.product-price {
  font-size: 18px;
  margin-bottom: 8px;
}

.product-description {
  font-size: 14px;
  margin-bottom: 16px;
}

.add-to-cart-btn {
  font-size: 16px;
  padding: 8px 12px;
}
</style>
