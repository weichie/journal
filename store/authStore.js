export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_USER_DATA = "SET_USER_DATA";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_ERRORS = "SET_ERRORS";

import { CLEAR_JOURNAL } from './journal';

import axios from 'axios';

const APIURL = process.env.baseUrl;

export const state = () => ({
  loggedIn: false,
  user: {},
  token: null,
  loading: false,
  errors: null,
});

export const actions = {
  [LOGIN_USER]: ({commit, dispatch}, payload) => {
    //TODO: set loading
    axios
      .post(`${APIURL}/login`, payload)
      .then((res) => {
        commit(SET_ERRORS, null);
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
      })
      .then((test) => {
        commit(SET_AUTHENTICATED, true);
        dispatch(SET_USER_DATA);
      })
      .catch(err => {
        commit(SET_ERRORS, err.response.data);
      });
  },
  [REGISTER_USER]: ({commit, dispatch}, payload) => {
    //TODO: set loading
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
        commit(SET_ERRORS, err.response.data);
      });
  },
  [SET_USER_DATA]: ({commit}, payload = null) => {
    console.log('SETTING USER DATA', payload);

    if (payload) {
      axios.defaults.headers.common['Authorization'] = payload;
    }
    
    axios
      .get(`${APIURL}/user`)
      .then((res) => {
        console.log(res.data);
        commit(SET_USER_DATA, res.data);
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
    commit('journal/CLEAR_JOURNAL', null, { root: true });
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
  [SET_ERRORS]: (state, payload) => {
    state.errors = payload;
  },
};
