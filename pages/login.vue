<template>
  <div class="login">
    <div class="content">
      <div class="auth-wrapper mx-auto">
        <div class="res-logo">
          <img src="/images/logo-solo-black.png" alt="Weichie Logo" />
        </div>
        <h1>Login</h1>

        <form action="" @submit.prevent="handleSubmit()" class="auth-form">
          <div class="input-row">
            <label for="email">Email <small class="error" v-if="errors && errors.email">{{ errors.email }}</small></label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="input-row">
            <label for="password">Password <small class="error" v-if="errors && errors.password">{{ errors.password }}</small></label>
            <input type="password" id="password" v-model="password" />
          </div>
          <div class="form-buttons">
            <small class="block error mb-2" v-if="errors && errors.general">{{errors.general}}</small>
            <button class="btn-blue" type="submit">
              Sign In
            </button>
            <nuxt-link to="/signup" class="btn-link">
              Create new account
            </nuxt-link>
          </div>
        </form>
        <Copyright />
      </div>
    </div>

    <authPanel 
      bg="/images/journal_bg.jpg" 
      title="Start your journey here!"
      info="The simplest thing you can do to start your day happy. Bored out at home? Still try to focus on the bright parts in your day. A happier you in 5 minutes a day!"
      signupText="Don't have an account?"
      signupButton="Sign Up"
      signupRoute="/signup"
    />
  </div>
</template>

<script>
import Copyright from '~/components/copyright';
import authPanel from '~/components/authPanel';

export default {
  name: 'Login',
  components: {
    Copyright,
    authPanel,
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
  computed: {
    errors() {
      if (this.$store.state.authStore.errors) {
        return this.$store.state.authStore.errors;
      }
    },
  },
}
</script>