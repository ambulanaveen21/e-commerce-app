<template>
  <nav class="navbar">
    <div class="nav-logo">
      <router-link to="/">🛍️ MyShop</router-link>
    </div>
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/products">Products</router-link></li>
      <li>
        <router-link to="/cart">🛒 Cart ({{ cartCount }})</router-link>
      </li>
      <li>
        <router-link to="/login" v-if="!isAuthenticated">🔑 Login</router-link>
        <button class="logout-btn" v-else @click="logout">🚪 Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cartCount', 'isAuthenticated']),
  },
  methods: {
    ...mapActions(['logoutUser']),
    logout() {
      this.logoutUser()
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2f2f2f;
  padding: 10px 20px;
  height: 40px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Logo */
.nav-logo a {
  font-size: 20px;
  font-weight: bold;
  color: #ff5733;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-logo a:hover {
  color: #e44d28;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-links li a:hover {
  color: #ff5733;
}

.logout-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0;
}

.logout-btn:hover {
  color: #ff5733;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 10px 15px;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .nav-links li {
    width: 100%;
  }

  .nav-links li a,
  .logout-btn {
    display: block;
    width: 100%;
    padding: 8px 0;
  }
}
</style>
