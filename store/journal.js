export const GET_JOURNALS = "GET_JOURNALS";
export const GET_ALL_JOURNALS = "GET_ALL_JOURNALS";
export const WRITE_JOURNAL = "WRITE_JOURNAL";
export const CLEAR_JOURNAL = "CLEAR_JOURNAL";

import { SET_ERRORS, SET_LOADING } from './uiStore';

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
    dispatch('uiStore/' + SET_LOADING, true, { root: true });
    axios.get(`${APIURL}/journals`)
      .then(res => {
        dispatch('uiStore/' + SET_LOADING, false, { root: true });
        commit(GET_ALL_JOURNALS, res.data);
      })
      .catch(err => {
        dispatch('uiStore/' + SET_LOADING, false, { root: true });
        console.error('GET_JOURNALS: ', err);
      });
  },
  [WRITE_JOURNAL]: ({commit, dispatch}, payload) => {
    dispatch('uiStore/' + SET_LOADING, true, { root: true });
    const pushData = {
      "body": {
        "item_1": payload.item_1,
        "item_2": payload.item_2,
        "item_3": payload.item_3
      },
      "date": payload.date
    };
    const jsonString = JSON.stringify(pushData);

    console.log(jsonString);
    
    axios.post(`${APIURL}/journal`, jsonString, {
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        console.log(res);
        commit(WRITE_JOURNAL, res.data.message);
        dispatch(GET_JOURNALS);
      })
      .catch(err => {
        dispatch('uiStore/' + SET_ERRORS, err.response.data, { root: true });
        dispatch('uiStore/' + SET_LOADING, false, { root: true });
      });
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