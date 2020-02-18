<template>
  <div class="page">
    <div class="container">
      <div class="title">
        <h1>Your daily 5M Journal</h1>
        <h2>What are you grateful for today?</h2>
      </div>
      
      <addJournalForm :allowpost="newestJournal !== today" />

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
import addJournalForm from '~/components/addJournalForm.vue';

export default {
  name: 'Home',
  components: {
    journalItem,
    addJournalForm,
  },
  data() {
    return {
      today: this.$options.filters.dateFormat(new Date().toISOString()),
    }
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
    newestJournal() {
      if(this.allJournals.length > 0) {
        const date = this.allJournals[0].createdAt;
        return this.$options.filters.dateFormat(date);
      }
    }
  },
}
</script>
