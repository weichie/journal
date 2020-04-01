export const GET_JOURNALS = "GET_JOURNALS";
export const GET_ALL_JOURNALS = "GET_ALL_JOURNALS";
export const WRITE_JOURNAL = "WRITE_JOURNAL";
export const CLEAR_JOURNAL = "CLEAR_JOURNAL";

import axios from 'axios';

const APIURL = process.env.baseUrl;

export const state = () => ({
  journals: [],
  searchResults: [],
  search: '',
  writeSuccess: false,
});

export const getters = {
  getAllJournals: (state) => {
    return state.journals;
  },
};

export const actions = {
  [GET_JOURNALS]: ({commit}) => {
    console.warn('MAKING FIREBASE CALL');
    axios.get(`${APIURL}/userjournals`)
      .then(res => {
        commit(GET_JOURNALS, res.data);
      })
      .catch(err => {
        console.error('GET_JOURNALS: ', err);
      });
  },
  [GET_ALL_JOURNALS]: ({ commit }) => {
    axios.get(`${APIURL}/journals`)
      .then(res => {
        commit(GET_ALL_JOURNALS, res.data);
      })
      .catch(err => {
        console.error('GET_JOURNALS: ', err);
      });
  },
  [WRITE_JOURNAL]: ({commit, dispatch}, payload) => {
    const jsonString = JSON.stringify({ body: payload });

    console.log(jsonString);
    
    // axios.post(`${APIURL}/journal`, jsonString, {
    //     headers: {'Content-Type': 'application/json'}
    //   })
    //   .then(res => {
    //     commit(WRITE_JOURNAL, res.data.message);
    //     dispatch(GET_JOURNALS);       
    //   })
    //   .catch(err => {
    //     console.error('WRITE_JOURNAL: ', err);
    //   });
  },
  [CLEAR_JOURNAL]: ({commit}) => {
    commit(CLEAR_JOURNAL);
  },
}

export const mutations = {
  [GET_JOURNALS](state, payload) {
    state.journals = payload;
  },
  [GET_ALL_JOURNALS] (state, payload) {
    state.allJournals = payload;
  },
  [WRITE_JOURNAL] (state, payload) {
    state.writeSuccess = payload;
  },
  [CLEAR_JOURNAL] (state) {
    state.journals = [];
  },
}