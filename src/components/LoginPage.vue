<template>
  <div>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <Form @submit="login" :validation-schema="schema">
          <div class="input-group">
            <label for="email">Email:</label>
            <Field name="email" type="email" v-model="email" v-slot="{ field, errors }">
              <input v-bind="field" :class="{ error: errors.length }" />
              <ErrorMessage name="email" class="error" />
            </Field>
          </div>

          <div class="input-group">
            <label for="password">Password:</label>
            <Field name="password" type="password" v-model="password" v-slot="{ field, errors }">
              <input v-bind="field" :class="{ error: errors.length }" />
              <ErrorMessage name="password" class="error" />
            </Field>
          </div>

          <button type="submit" class="login-button">Login</button>
        </Form>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import Navbar from './Navbar.vue'

export default {
  components: { Navbar, Form, Field, ErrorMessage },
  data() {
    return {
      email: '',
      password: '',
      error: null,
      schema: yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required'),
      }),
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
  height: calc(100vh - 70px);
  margin-top: 20px;
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

.input-group input:invalid,
.input-group input.error {
  border-color: red;
  outline: none;
}

/* Style error messages */
.error {
  color: red;
  font-size: 13px;
  margin-top: 5px;
  display: block;
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
