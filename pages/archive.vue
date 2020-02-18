<template>
  <div class="page">
    <div class="container">
      <div class="title">
        <h1>Archive ({{ journalCounter }})</h1>
        <h2>From {{ oldestJournal | dateFormat }} to {{ newestJournal | dateFormat }}</h2>
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
  name: 'Archive',
  components: {
    journalItem,
  },
  mounted() {
    if(this.$store.state.journal.journals.length === 0) {
      this.$store.dispatch('journal/GET_JOURNALS');
    }
  },
  computed: {
    allJournals() {
      return this.$store.state.journal.journals;
    },
    journalCounter() {
      return this.allJournals.length;
    },
    oldestJournal() {
      if(this.allJournals.length > 0) {
        const lastFromArray = this.allJournals.length - 1;
        return this.allJournals[lastFromArray].createdAt;
      }
    },
    newestJournal() {
      if(this.allJournals.length > 0) {
        return this.allJournals[0].createdAt;
      }
    }
  },
}
</script>