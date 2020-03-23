<template>
  <div class="login">
    <div class="container mx-auto sm">
      <div class="auth-wrapper mx-auto">
        <h1>Login</h1>
        <form action="" @submit.prevent="handleSubmit()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="input-row full mb-4">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="input-row full mb-4">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            <nuxt-link to="/signup" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Create new account
            </nuxt-link>
          </div>
        </form>
        <Copyright />
      </div>
    </div>
  </div>
</template>

<script>
import Copyright from '~/components/copyright';

export default {
  name: 'Login',
  components: {
    Copyright,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('authStore/LOGIN_USER', loginData);
    },
  },
}
</script>