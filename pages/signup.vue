<template>
  <div class="login">
    <div class="content">
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
          <div class="form-buttons">
            <button class="btn-blue" type="submit">
              Create account
            </button>
            <nuxt-link to="/login" class="btn-link">
              Already have an accont?
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
      signupText="Already have an account?"
      signupButton="Login"
      signupRoute="/login"
    />
  </div>
</template>

<script>
import Copyright from '~/components/copyright';
import authPanel from '~/components/authPanel';

export default {
  name: 'Signup',
  components: {
    Copyright,
    authPanel,
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