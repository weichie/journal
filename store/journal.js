export const GET_JOURNALS = "GET_JOURNALS";
import axios from 'axios';

export const state = () => ({
  journals: [],
  searchResults: [],
  search: '',
});

export const getters = {
  all: state => state.journals,
};

export const actions = {
  [GET_JOURNALS]: ({commit}, payload) => {
    console.warn('MAKING FIREBASE CALL');
    axios.get('https://europe-west1-weichie-journal.cloudfunctions.net/api/journals')
      .then(res => {
        commit(GET_JOURNALS, res.data);
      })
      .catch(err => {
        console.error('GET_JOUNRALS:', err);
      });
  }
}

export const mutations = {
  [GET_JOURNALS] (state, payload) {
    state.journals = payload;
  }
}