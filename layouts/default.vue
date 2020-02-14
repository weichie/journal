<template>
  <div class="app">
    <Sidebar />
    <nuxt />
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
}
</script>