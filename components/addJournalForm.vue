<template>
  <div class="add-journal-content">
    <form action="" class="add-journal" v-if="!successMessage">
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
      <div class="input-row justify-end">
        <button class="btn btn-primary" type="submit" @click.prevent="submitJournal">Write journal</button>
      </div>
    </form>

    <div class="success-message" v-else>
      <strong>{{ successMessage }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addJournalForm',
  data() {
    return {
      item_1: '',
      item_2: '',
      item_3: '',
      errors: null,
    };
  },
  methods: {
    submitJournal() {
      const body = {
        item_1: this.item_1,
        item_2: this.item_2,
        item_3: this.item_3,
      }

      if(this.validateForm(body)) {
        this.$store.dispatch('journal/WRITE_JOURNAL', body);
      }
    },
    validateForm(data) {
      const err = [];

      for (let [key, value] of Object.entries(data)) {
        if(value.trim() === '') {
          err.push(key);
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
  },
}
</script>