<template>
  <div class="sidebar" v-if="authenticated">
    <Logo />

    <div class="menu">
      <nav class="main-menu">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/archive">Archive</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
        <!-- <nuxt-link to="/profile">Profile</nuxt-link> -->
        <a href="#!" @click.prevent="logoutUser">Logout</a>
      </nav>
    </div>

    <div class="copy">
      &copy; {{ date }} <a href="https://weichie.com" target="_blank">WeichieProjects</a>
      <ul class="links">
        <li><nuxt-link to="privacy">Privacy</nuxt-link></li>
        <li><nuxt-link to="terms">Terms & Conditions</nuxt-link></li>
        <li><nuxt-link to="contact">Contact</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Logo from './Logo';

export default {
  name: 'Sidebar',
  components: {
    Logo,
  },
  computed: {
    date() {
      const date = new Date();
      return date.getFullYear();
    },
    authenticated() {
      return this.$store.state.authStore.loggedIn;
    },
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('authStore/LOGOUT_USER');
    },
  },
}
</script>