<template>
  <div>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <label>Email:</label>
            <Field name="email" v-model="email" rules="required|email" v-slot="{ errors }">
              <input type="email" v-model="email" required />
              <span class="error" v-if="errors.length">{{ errors[0] }}</span>
            </Field>
          </div>

          <div class="input-group">
            <label>Password:</label>
            <Field name="password" v-model="password" rules="required" v-slot="{ errors }">
              <input type="password" v-model="password" required />
              <span class="error" v-if="errors.length">{{ errors[0] }}</span>
            </Field>
          </div>

          <button type="submit" class="login-button">Login</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Field } from 'vee-validate'
import Navbar from './Navbar.vue'

export default {
  components: { Navbar, Field },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    login() {
      if (this.email === 'user@example.com' && this.password === 'password') {
        this.$store.commit('setUser', { email: this.email })
        this.$router.push('/')
      } else {
        this.error = 'Invalid credentials. Try again!'
      }
    },
  },
}
</script>

<style scoped>
/* Keep navbar at the top */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f4f4f4;
  height: calc(100vh - 70px); /* Adjust height to account for Navbar */
  margin-top: 20px; /* Push login box below Navbar */
}

/* Login Box */
.login-box {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  text-align: center;
}

/* Input Fields */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Button Styling */
.login-button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.login-button:hover {
  background: #0056b3;
}

/* Error Message */
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-box {
    width: 90%;
    padding: 20px;
  }
}
</style>
