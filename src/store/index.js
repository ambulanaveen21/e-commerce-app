import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))

      const savedCart = JSON.parse(localStorage.getItem(`cart_${user?.id}`)) || []
      state.cart = savedCart
      localStorage.setItem('cart', JSON.stringify(savedCart))
    },
    logout(state) {
      if (state.user) {
        localStorage.setItem(`cart_${state.user.id}`, JSON.stringify(state.cart))
      }
      state.user = null
      state.cart = []
      localStorage.removeItem('user')
      localStorage.removeItem('cart')
    },
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = []
      localStorage.removeItem('cart')
    },
    updateQuantity(state, { index, amount }) {
      state.cart[index].quantity += amount
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('http://localhost:3001/products')
        commit('setProducts', response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    logoutUser({ commit }) {
      commit('logout')
    },
  },
  getters: {
    getProducts: (state) => state.products,
    getUser: (state) => state.user,
    getCart: (state) => state.cart,
    isAuthenticated: (state) => !!state.user,
    cartCount: (state) => state.cart.reduce((count, item) => count + item.quantity, 0),
    cartTotal: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
})
