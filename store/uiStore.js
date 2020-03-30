export const SET_ERRORS = "SET_ERRORS";

export const state = () => ({
  errors: null,
  loading: false,
});

export const actions = {
  [SET_ERRORS]: ({commit}, payload) => {
    commit(SET_ERRORS, payload);
  },
};

export const mutations = {
  [SET_ERRORS]: (state, payload) => {
    state.errors = payload;
  },
}