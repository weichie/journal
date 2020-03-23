<template>
  <div class="login">
    <div class="container mx-auto sm">
      <div class="auth-wrapper mx-auto">
        <h1>Signup</h1>
        <form action="" @submit.prevent="handleSubmit()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="input-row full mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div class="input-row full mb-4">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            <nuxt-link to="/login" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Create new account
            </nuxt-link>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy; 2020 A <a href="https://weichie.com">Weichie</a> Project. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
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