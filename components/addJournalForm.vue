<template>
  <div class="add-journal-content">
    <div class="success-message mb-5" v-if="!successMessage && !allowpost">
      <strong>Good job! You wrote your journal today.</strong>
    </div>

    <form action="" class="add-journal">
      <div class="input-row" :class="{'error': errors && errors.includes('item_1') }">
        <label for="item_1">Item 1</label>
        <input type="text" id="item_1" v-model="item_1">
      </div>
      <div class="input-row" :class="{'error': errors && errors.includes('item_2') }">
        <label for="item_2">Item 2</label>
        <input type="text" id="item_2" v-model="item_2">
      </div>
      <div class="input-row" :class="{'error': errors && errors.includes('item_3') }">
        <label for="item_3">Item 3</label>
        <input type="text" id="item_3" v-model="item_3">
      </div>
      <div class="input-row">
        <label for="journalday">Select day</label>
        <input type="date" id="journalday" v-model="journalday">
      </div>
      <div class="input-row justify-end">
        <span class="date-error" v-if="errors && errors.includes('date')">You can't write for this date yet.</span>
        <span class="date-error" v-if="storeErrors && storeErrors.handle">{{ storeErrors.handle }}</span>
        <button class="btn btn-primary" type="submit" @click.prevent="submitJournal">Write journal</button>
      </div>
    </form>

    <div class="success-message" v-if="successMessage && !allowpost">
      <strong>{{ successMessage }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addJournalForm',
  props: {
    allowpost: Boolean,
  },
  data() {
    return {
      item_1: '',
      item_2: '',
      item_3: '',
      journalday: '',
      errors: null,
    };
  },
  mounted() {
    const today = new Date().toISOString().substring(0,10);
    this.journalday = today;
  },
  methods: {
    submitJournal() {
      const formatJournalDay = new Date(this.journalday).toISOString();

      const body = {
        item_1: this.item_1,
        item_2: this.item_2,
        item_3: this.item_3,
        date: formatJournalDay,
      }

      if(this.validateForm(body)) {
        this.$store.dispatch('journal/WRITE_JOURNAL', body);
      }
    },
    validateForm(data) {
      const err = [];
      const today = new Date().toISOString();

      for (let [key, value] of Object.entries(data)) {
        if(key === 'date') {
          const formatJournalDay = new Date(this.journalday).toISOString();
          if (value > today) {
            err.push(key);
          }
        } else {
          if(value.trim() === '') {
            err.push(key);
          }
        }
      }

      this.errors = err;
      if (err.length === 0) return true;
    },
  },
  computed: {
    successMessage() {
      return this.$store.state.journal.writeSuccess;
    },
    storeErrors() {
      if (this.$store.state.uiStore.errors) {
        return this.$store.state.uiStore.errors;
      }
    },
  },
}
</script>