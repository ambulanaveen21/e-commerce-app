import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ProductsPage from '../components/ProductsPage.vue'
import ProductDetails from '../components/ProductDetails.vue'
import CartPage from '../components/CartPage.vue'
import CheckoutPage from '../components/CheckoutPage.vue'
import OrderConfirmation from '../components/OrderConfirmation.vue'
import LoginPage from '../components/LoginPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/products', component: ProductsPage },
  { path: '/product/:id', component: ProductDetails, props: true },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/order-confirmation', component: OrderConfirmation },
  { path: '/login', component: LoginPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
