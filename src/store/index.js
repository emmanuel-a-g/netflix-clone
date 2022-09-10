import { createStore } from "vuex";
//FIRESTORE V9
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  signOut,
  updateProfile,
} from "firebase/auth";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore/lite";

const store = createStore({
  state() {
    return {
      user: "",
      userId: null,
      email: "",
      name: "",
    };
  },
  mutations: {
    authenticate(state, payload) {
      state.user = payload.user ? payload.user : false;
      state.userId = payload.uid;
    },
    logOut(state) {
      state.user = null;
      state.userId = null;
      state.email = null;
      state.name = null;
    },
    changeName(state, payload) {
      state.name = payload.name;
    },
    emailChange(state, payload) {
      state.email = payload;
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    loggedIn(state) {
      return !!state.user;
    },
    returnEmail(state) {
      return state.email;
    },
    getName(state) {
      return state.name;
    },
  },
  actions: {
    async signUp(context, payload) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, payload.email, payload.password)
          .then((userCredential) => {
            context.commit("authenticate", { user: userCredential });
            // save uid
            // maybe set up name in sign up 4
            // save email maybe?
            resolve("Success signed up");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async login(context, payload) {
      return new Promise((resolve, reject) => {
        if (payload.remember) {
          setPersistence(auth, browserLocalPersistence)
            .then(() => {
              return signInWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
              );
            })
            .then((userCredential) => {
              context.commit("authenticate", { user: userCredential });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          setPersistence(auth, browserSessionPersistence)
            .then(() => {
              return signInWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
              );
            })
            .then((userCredential) => {
              context.commit("authenticate", { user: userCredential });
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    },
    async logOut(context) {
      return new Promise((resolve, reject) => {
        signOut(auth)
          .then(() => {
            context.commit("logOut");
            resolve("sucess logout");
          })
          .catch((err) => {
            reject(`Failed logout: ${err}`);
          });
      });
    },
    changeName(context, payload) {
      //ALLOW to Choose between Users
      context.commit("changeName", payload);
    },
    authenticate(context, payload) {
      return new Promise((resolve, reject) => {
        if (payload.user) {
          context.commit("authenticate", { user: payload.user });
          resolve("Sucess auth");
        } else {
          reject("Error in auth");
        }
      });
    },
    actionEmail(context, payload) {
      context.commit("emailChange", payload);
    },
    updateProfileName(context, payload) {
      return new Promise((resolve, reject) => {
        updateProfile(auth, {
          displayName: payload.name,
          photoURL: payload.photoURL || "",
        })
          .then(() => {
            context.commit("setName", payload.name);
            resolve("updated name");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // async addNameToDatabase(context, payload) {
    //   //Name and user's UID
    //   // set locally the name in vuex
    //   // context.commit("")
    // },
  },
});

export default store;
