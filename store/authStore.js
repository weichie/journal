export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_USER_DATA = "SET_USER_DATA";
export const LOGOUT_USER = "LOGOUT_USER";

import { CLEAR_JOURNAL } from './journal';
import { SET_ERRORS, SET_LOADING } from './uiStore';

import axios from 'axios';

const APIURL = process.env.baseUrl;

export const state = () => ({
  loggedIn: false,
  user: {},
  token: null,
});

export const actions = {
  [LOGIN_USER]: ({commit, dispatch}, payload) => {
    dispatch('uiStore/' + SET_LOADING, true, { root: true });
    dispatch('uiStore/' + SET_ERRORS, null, { root: true });

    axios
      .post(`${APIURL}/login`, payload)
      .then((res) => {
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
      })
      .then((test) => {
        commit(SET_AUTHENTICATED, true);
        dispatch(SET_USER_DATA);
      })
      .catch(err => {
        dispatch('uiStore/' + SET_LOADING, false, { root: true });
        dispatch('uiStore/' + SET_ERRORS, err.response.data, { root: true });
      });
  },
  [REGISTER_USER]: ({commit, dispatch}, payload) => {
    dispatch('uiStore/' + SET_LOADING, true, { root: true });
    dispatch('uiStore/' + SET_ERRORS, null, { root: true });

    axios
      .post(`${APIURL}/signup`, payload)
      .then((res) => {
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
      })
      .then(() => {
        commit(SET_AUTHENTICATED, true);
        dispatch(SET_USER_DATA);
      })
      .catch(err => {
        dispatch('uiStore/' + SET_LOADING, false, { root: true });
        dispatch('uiStore/' + SET_ERRORS, err.response.data, { root: true });
      });
  },
  [SET_USER_DATA]: ({commit, dispatch}, payload = null) => {
    if (payload) {
      axios.defaults.headers.common['Authorization'] = payload;
    }
    
    axios
      .get(`${APIURL}/user`)
      .then((res) => {
        commit(SET_USER_DATA, res.data);
        dispatch('uiStore/' + SET_LOADING, false, { root: true });
        $nuxt.$router.push('/');
      })
      .catch(err => {
        console.error(err);
      });
  },
  [LOGOUT_USER]: ({commit}) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    commit(SET_AUTHENTICATED, false);
    commit('journal/' + CLEAR_JOURNAL, null, { root: true });
    $nuxt.$router.push('/login');
  },
};

export const mutations = {
  [SET_AUTHENTICATED]: (state, payload) => {
    state.loggedIn = payload;
  },
  [SET_USER_DATA]: (state, payload) => {
    state.user = payload;
  },
};
