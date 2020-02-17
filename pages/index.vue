<template>
  <div class="page">
    <div class="container">
      <h1 class="title">
        journal
      </h1>
      <h2 class="subtitle">
        Nuxt/firebase project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
        </a>
      </div>

      <ul v-if="allJournals" class="journal-list">
        <journalItem 
          v-for="(journal, key) in allJournals" 
          :key="'journal-' + key" 
          :item="journal" />
      </ul>
    </div>
  </div>
</template>

<script>
import journalItem from '~/components/journalItem.vue';

export default {
  name: 'Home',
  components: {
    journalItem,
  },
  mounted() {
    if (this.$store.state.journal.journals.length === 0) {
      this.$store.dispatch('journal/GET_JOURNALS', 3);
    }
  },
  computed: {
    allJournals() {
      return this.$store.state.journal.journals;
    },
  },
}
</script>
