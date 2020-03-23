<template>
  <div class="login">
    <div class="container mx-auto sm">
      <div class="auth-wrapper mx-auto">
        <h1>Signup</h1>
        <form action="" @submit.prevent="handleSubmit()" class="auth-form">
          <div class="input-row full mb-4">
            <label for="userHandle">Username</label>
            <input type="text" id="userHandle" v-model="userHandle" />
          </div>
          <div class="input-row full mb-4">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="input-row full mb-4">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" class="" />
          </div>
          <div class="input-row full mb-4">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" />
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Create account
            </button>
            <nuxt-link to="/login" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Already have an account?
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
  name: 'Signup',
  components: {
    Copyright,
  },
  data() {
    return {
      userHandle: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    handleSubmit() {
      const userData = {
        userHandle: this.userHandle,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      this.$store.dispatch('authStore/REGISTER_USER', userData);
    },
  },
}
</script>