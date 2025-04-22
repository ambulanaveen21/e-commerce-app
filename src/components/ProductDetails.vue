<template>
  <div class="product-container">
    <div class="content">
      <div class="product-card" v-if="product">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-price">$ {{ product.price }}</p>
          <p class="product-description">{{ product.description }}</p>

          <div v-if="product.specs && product.specs.length" class="product-specs">
            <h2>Specifications:</h2>
            <ul>
              <li v-for="(spec, index) in product.specs" :key="index">{{ spec }}</li>
            </ul>
          </div>

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
  background-color: #f5f5f5;
  padding: 30px 10px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.product-content {
  display: flex;
  gap: 40px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  flex-wrap: wrap;
}

.product-image-section {
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  object-fit: contain;
}

.product-details-section {
  flex: 2 1 500px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-title {
  font-size: 28px;
  font-weight: bold;
}

.product-price {
  font-size: 24px;
  color: #e53935;
}

.product-description {
  font-size: 16px;
  color: #555;
}

.product-specs h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.product-specs ul {
  padding-left: 20px;
  list-style: disc;
}

.product-specs li {
  font-size: 14px;
  margin-bottom: 6px;
}

.add-to-cart-btn {
  padding: 10px 16px;
  background-color: #ff9900;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 16px;
  width: fit-content;
  transition: background-color 0.2s ease-in-out;
}

.add-to-cart-btn:hover {
  background-color: #e68a00;
}

.loading {
  font-size: 18px;
  text-align: center;
}
</style>
