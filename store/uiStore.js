export const SET_ERRORS = "SET_ERRORS";
export const SET_LOADING = "SET_LOADING";

export const state = () => ({
  errors: null,
  loading: false,
});

export const actions = {
  [SET_ERRORS]: ({commit}, payload) => {
    commit(SET_ERRORS, payload);
  },
  [SET_LOADING]: ({commit}, payload) => {
    commit(SET_LOADING, payload);
  },
};

export const mutations = {
  [SET_ERRORS]: (state, payload) => {
    state.errors = payload;
  },
  [SET_LOADING]: (state, payload) => {
    state.loading = payload;
  },
}
