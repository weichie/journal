<template>
  <div class="page m-8">
    <div class="container">
      <div class="title">
        <h1>Your daily 5M Journal</h1>
        <h2>What are you grateful for today?</h2>
      </div>
      
      <addJournalForm :allowpost="newestJournal !== today" />

      <div v-if="allJournals" class="journal-wrapper">
        <journalItem 
          v-for="(journal, key) in allJournals" 
          :key="'journal-' + key" 
          :item="journal" />
      </div>

      <nuxt-link v-if="limit <= allJournals.length" to="/archive" class="btn btn-primary">View journal archive</nuxt-link>
    </div>
  </div>
</template>

<script>
import journalItem from '~/components/journalItem.vue';
import addJournalForm from '~/components/addJournalForm.vue';

export default {
  name: 'Home',
  middleware: 'auth',
  components: {
    journalItem,
    addJournalForm,
  },
  data() {
    return {
      today: this.$options.filters.dateFormat(new Date().toISOString()),
      limit: 5,
    }
  },
  mounted() {
    if(this.$store.state.journal.journals.length === 0) {
      this.$store.dispatch('journal/GET_JOURNALS');
    }
  },
  computed: {
    allJournals() {
      const observer = this.$store.getters['journal/getAllJournals'];
      const array = JSON.parse(JSON.stringify(observer));
      if(array) {
        return this.limit ? array.slice(0, this.limit) : array;
      }
    },
    newestJournal() {
      if(this.allJournals && this.allJournals.length > 0) {
        const date = this.allJournals[0].createdAt;
        return this.$options.filters.dateFormat(date);
      }
    }
  },
}
</script>
