<template>
  <p class="text-center text-gray-500 text-xs">
    &copy; {{ year }} A <a href="https://weichie.com" target="_blank">Weichie Project</a>. All rights reserved.
  </p>
</template>

<script>
export default {
  name: 'Copyight',
  computed: {
    year() {
      return new Date().getFullYear();
    }
  },
}
</script>