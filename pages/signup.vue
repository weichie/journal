<template>
  <div class="login">
    <div class="content">
      <div class="auth-wrapper mx-auto">
        <div class="res-logo">
          <img src="/images/logo-solo-black.png" alt="Weichie Logo" />
        </div>
        <h1>Signup</h1>

        <form action="" @submit.prevent="handleSubmit()" class="auth-form">
          <div class="input-row full mb-4">
            <label for="userHandle">
              Username 
              <small class="error" v-if="errors && errors.handle">
                {{ errors.handle }}
              </small>
            </label>
            <input type="text" id="userHandle" v-model="userHandle" />
          </div>
          <div class="input-row full mb-4">
            <label for="email">
              Email
              <small class="error" v-if="errors && errors.handle">
                {{ errors.email }}
              </small>
            </label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="input-row full mb-4">
            <label for="password">
              Password
              <small class="error" v-if="errors && errors.password">
                {{ errors.password }}
              </small>
            </label>
            <input type="password" id="password" v-model="password" class="" />
          </div>
          <div class="input-row full mb-4">
            <label for="confirmPassword">
              Confirm Password
              <small class="error" v-if="errors && errors.confirmPassword">
                {{ errors.confirmPassword }}
              </small>
            </label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" />
          </div>
          <div class="form-buttons">
            <small class="block error mb-2" v-if="errors && errors.message">
              {{ errors.message }}
            </small>
            <button class="btn-blue" :class="{'loading': loading}" type="submit">
              <span v-if="!loading">Create account</span>
              <span v-else>Loading...</span>
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
  computed: {
    errors() {
      if (this.$store.state.uiStore.errors) {
        return this.$store.state.uiStore.errors;
      }
    },
    loading() {
      return this.$store.state.uiStore.loading;
    }
  },
}
</script>