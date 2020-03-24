<template>
  <div class="general" :style="{ backgroundImage: 'url(' + background + ')' }">
    <div class="blue-filter"></div>
    
    <div class="top-banner">
      <img src="/images/logo-solo-white.png" alt="Weichie Logo" />
      <p class="singup">
        {{ signupText }}
        <nuxt-link :to="signupRoute">{{ signupButton }}</nuxt-link>
      </p>
    </div>

    <div class="info">
      <h1>{{ title }}</h1>
      <p>{{ info }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authPanel',
  props: {
    bg: String,
    title: String,
    info: String,
    signupText: String,
    signupButton: String,
    signupRoute: String,
  },
  data() {
    return {
      background: this.bg,
    }
  },
}
</script>