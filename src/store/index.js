import { createStore } from "vuex";
//FIRESTORE V9
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { database as db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore/lite";

const store = createStore({
  // modules: {},
  state() {
    return {
      user: "emm",
      userId: null,
      email: "",
      password: "",
      name: "",
      //TODO: ARE USER AND NAME THE SAME??
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
    authenticate(state, payload) {
      state.user = payload.user ? payload.user : true;
    },
    logOut(state) {
      state.user = null;
      state.userId = null;
      state.email = null;
      state.password = null;
    },
    changeName(state, payload) {
      state.name = payload.name;
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
    getName(state) {
      return state.name;
    },
  },
  actions: {
    async signUp(_1, payload) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, payload.email, payload.password)
          .then((userCredential) => {
            this.commit("authenticate", { user: userCredential });
            resolve("Success");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setDetails(context, payload) {
      //if valid then say authenticated
      if (payload.email && payload.password) {
        //temporay implementation
        context.commit("authenticate");
      }
      context.commit("setDetails", payload);
    },
    logOut(context) {
      context.commit("logOut");
    },
    changeName(context, payload) {
      //TODO
      //ALLOW to Choose between Users
      context.commit("changeName", payload);
    },
  },
});

export default store;
