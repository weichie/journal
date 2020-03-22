export const GET_JOURNALS = "GET_JOURNALS";
export const GET_ALL_JOURNALS = "GET_ALL_JOURNALS";
export const WRITE_JOURNAL = "WRITE_JOURNAL";

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
  [GET_JOURNALS]: ({commit}, payload) => {
    console.warn('MAKING FIREBASE CALL');
    axios.get(`${APIURL}/userjournals`)
      .then(res => {
        console.log(payload);
        console.log(res);
        commit(GET_JOURNALS, res.data);
      })
      .catch(err => {
        console.error('GET_JOURNALS: ', err);
      });
  },
  [GET_ALL_JOURNALS]: ({ commit }, payload) => {
    console.warn('MAKING FIREBASE CALL');
    axios.get(`${APIURL}/journals`)
      .then(res => {
        commit(GET_ALL_JOURNALS, res.data);
      })
      .catch(err => {
        console.error('GET_JOURNALS: ', err);
      });
  },
  [WRITE_JOURNAL]: ({commit, dispatch}, payload) => {
    console.warn('MAKING FIREBASE CALL');
    const jsonString = JSON.stringify({ body: payload });
    
    axios.post(`${APIURL}/journal`, jsonString, {
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
  [GET_JOURNALS](state, payload) {
    state.journals = payload;
  },
  [GET_ALL_JOURNALS] (state, payload) {
    state.allJournals = payload;
  },
  [WRITE_JOURNAL] (state, payload) {
    state.writeSuccess = payload;
  },
}