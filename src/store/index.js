import { createStore } from "vuex";
//different module for each section

const store = createStore({
  // modules: {},
  state() {
    return {
      user: null,
      userId: 1,
      email: "",
      password: "",
    };
  },
  mutations: {
    setDetails(state, payload) {
      state.email = payload.email;
      state.password = payload.password;
      console.log("Setting details: ", payload);
    },
    // temporary implementation!!!
    authenticate(state) {
      state.user = true;
    }
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    loggedIn(state) {
      return !!state.user;
    },
    getEmail(state) {
      return state.email;
    },
  },
  actions: {
    setDetails(context, payload) {
      //if valid then say authenticated
      if (payload.email, payload.password) {
        //temporay implementation
        context.commit("authenticate");
      }
      context.commit("setDetails", payload);
    },
  },
});

export default store;
