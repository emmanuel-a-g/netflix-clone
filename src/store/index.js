import { createStore } from "vuex";
//different module for each section

const store = createStore({
  // modules: {},
  state() {
    return {
      user: null,
      userId: 1,
    }
  },
  getters: {
    user(state) {
      return !!state.user;
    },
    userId(state) {
      return state.userId;
    }
  }
})

export default store;