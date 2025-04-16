<template>
  <div>
    <h1>Latest Mobiles & Watches</h1>

    <div v-if="loading" class="loading">Loading products...</div>

    <div v-else class="products">
      <div v-for="product in latestProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p class="price">${{ product.price }}</p>
        <button class="details-button" @click="handleProductClick(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Footer from '../components/Footer.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  components: { Navbar, Footer },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['getProducts']),
    ...mapState(['cart', 'user']),
    latestProducts() {
      return this.getProducts.slice(0, 5)
    },
    isLoggedIn() {
      return this.user !== null
    },
  },
  methods: {
    ...mapActions(['fetchProducts']),
    handleProductClick(product) {
      if (this.isLoggedIn) {
        this.$store.commit('addToCart', product)
        alert('Product added to cart!')
        this.$router.push('/')
      } else {
        alert('Please log in first.')
        this.$router.push('/login')
      }
    },
  },
  async created() {
    await this.fetchProducts()
    this.loading = false
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 28px;
  margin-top: 20px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.products {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 60px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  width: 250px;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #e44d26;
}

/* Buttons */
.details-button {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 15px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.details-button:hover {
  background: #0056b3;
}
</style>
