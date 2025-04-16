<template>
  <div>
    <h1>Latest Mobiles & Watches</h1>

    <div class="controls">
      <select v-model="selectedSort">
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>

      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option value="phone">Mobiles</option>
        <option value="watch">Watches</option>
      </select>
    </div>

    <div v-if="loading" class="loading">Loading products...</div>

    <div v-else class="products">
      <div v-for="product in filteredAndSortedProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p class="price">${{ product.price }}</p>
        <button class="details-button" @click="handleProductClick(product)">Add to Cart</button>
        <router-link :to="'/product/' + product.id" class="details-button"
          >View Details</router-link
        >
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
      selectedSort: '',
      selectedCategory: '',
    }
  },
  computed: {
    ...mapGetters(['getProducts']),
    ...mapState(['cart', 'user']),

    isLoggedIn() {
      return this.user !== null
    },

    filteredAndSortedProducts() {
      let products = [...this.getProducts]

      // Apply Category Filter (Only Mobiles and Watches)
      if (this.selectedCategory) {
        products = products.filter((product) => product.category === this.selectedCategory)
      }

      // Apply Sorting
      if (this.selectedSort === 'price-asc') {
        products.sort((a, b) => a.price - b.price)
      } else if (this.selectedSort === 'price-desc') {
        products.sort((a, b) => b.price - a.price)
      } else if (this.selectedSort === 'popularity') {
        products.sort((a, b) => b.popularity - a.popularity)
      }

      return products
    },
  },
  methods: {
    ...mapActions(['fetchProducts']),
    handleProductClick(product) {
      if (this.isLoggedIn) {
        this.$store.commit('addToCart', product)
        alert('Product added to cart!')
        this.$router.push('/cart')
      } else {
        alert('Please log in first.')
        this.$router.push('/login')
      }
    },
    logProductId(productId) {
      console.log('Product ID:', productId)
    },
  },
  async created() {
    await this.fetchProducts()
    this.loading = false
  },
}
</script>

<style scoped>
div {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 15px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 30px;
  margin: 10px 0 20px;
  font-weight: 600;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Controls: Sort & Filter */
.controls {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 10px 0 30px;
}

.controls select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  background: #f9f9f9;
  cursor: pointer;
  transition: border-color 0.3s;
}

.controls select:focus {
  outline: none;
  border-color: #007bff;
}

/* Loading text */
.loading {
  text-align: center;
  font-size: 18px;
  color: #888;
}

/* Products Grid */
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding: 0 10px 40px;
}

/* Individual Product Card */
.product-card {
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
  width: 240px;
  background: #fff;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 10px 0;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #e44d26;
  margin-bottom: 10px;
}

/* Action Buttons */
.details-button {
  display: inline-block;
  padding: 8px 14px;
  background: #007bff;
  color: #fff;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 5px 4px 0;
}

.details-button:hover {
  background-color: #0056b3;
}

/* Responsive tweaks */
@media (max-width: 600px) {
  .product-card {
    width: 90%;
  }

  .controls {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
