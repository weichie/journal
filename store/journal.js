export const state = () => ({
  journals: [],
  searchResults: [],
  search: '',
});

export const getters = {
  all: state => state.journals,
};

export const actions = {
  getJournals: ({commit}, payload) => {
    console.log('action: getJournal');
  }
}

export const mutations = {
  getJournals (state, payload) {
    state.journals = payload;
  }
}