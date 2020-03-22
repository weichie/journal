<template>
  <div class="page m-4">
    <div class="container">
      <div class="auth-wrapper">
        <h1>Login</h1>
        <form action="" @submit.prevent="handleSubmit()">
          <div class="input-row full">
            <label for="email">EMail</label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="input-row full">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
          </div>
          <div class="input-row full align-right">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
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