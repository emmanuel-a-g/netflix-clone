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
  updateEmail,
  onAuthStateChanged,
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
      requiresAuthAgain: false,
    };
  },
  mutations: {
    authenticate(state, payload) {
      state.user = payload.user ? payload.user : false;
      state.userId = payload.user.uid;
      state.email = payload.user.email;
      state.name = payload.user.displayName;
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
            context.commit("authenticate", userCredential);
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
              context.commit("authenticate", userCredential);
              resolve(true);
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
              context.commit("authenticate", userCredential);
              resolve(true);
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
    async updateProfileName(context, payload) {
      return new Promise((resolve, reject) => {
        updateProfile(context.state.user, {
          displayName: payload.name,
          photoURL: payload.photoURL || "",
        })
          .then(() => {
            context.commit("changeName", payload);
            resolve("updated name");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async updateEmail(context, payload) {
      return new Promise((resolve, reject) => {
        updateEmail(context.state.user, payload.email)
          .then(() => {
            context.commit("emailChange", payload.email);
            resolve("Sucess updated email");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
export async function checkAuth() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        console.log("no-user");
        reject(false);
      }
    });
  });
}

export default store;
