export const GET_JOURNALS = "GET_JOURNALS";
export const WRITE_JOURNAL = "WRITE_JOURNAL";

import axios from 'axios';

export const state = () => ({
  journals: [],
  searchResults: [],
  search: '',
  writeSuccess: false,
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
        console.error('GET_JOUNRALS: ', err);
      });
  },
  [WRITE_JOURNAL]: ({commit, dispatch}, payload) => {
    console.warn('MAKING FIREBASE CALL');
    const jsonString = JSON.stringify({ body: payload });
    
    axios.post('https://europe-west1-weichie-journal.cloudfunctions.net/api/journal', jsonString, {
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        commit(WRITE_JOURNAL, res.data.message);
        dispatch(GET_JOURNALS);       
      })
      .catch(err => {
        console.error('WRITE_JOURNAL: ', err);
      });
  },
}

export const mutations = {
  [GET_JOURNALS] (state, payload) {
    state.journals = payload;
  },
  [WRITE_JOURNAL] (state, payload) {
    state.writeSuccess = payload;
  },
}