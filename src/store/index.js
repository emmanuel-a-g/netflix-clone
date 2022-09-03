import { createStore } from "vuex";
//different module for each section

const store = createStore({
  // modules: {},
  state() {
    return {
      user: null,
      userId: null,
      email: "",
      password: "",
    };
  },
  mutations: {
    setDetails(state, payload) {
      state.email = payload.email;
      state.password = payload.password;
      console.log("Setting details: ", payload);
      //remove password from saved state once logged in!!
    },
    // temporary implementation!!!
    authenticate(state) {
      state.user = true;
    },
    logOut(state) {
      state.user = null;
      state.userId = null;
      state.email = null;
      state.password = null;
    },
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
      if ((payload.email, payload.password)) {
        //temporay implementation
        context.commit("authenticate");
      }
      context.commit("setDetails", payload);
    },
    logOut(context) {
      context.commit("logOut");
    },
  },
});

export default store;
