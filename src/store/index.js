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
  deleteUser,
} from "firebase/auth";
import { db } from "../firebase";
// onSnapshot
import { doc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
let userId;
const store = createStore({
  state() {
    return {
      user: "",
      userId: null,
      email: "",
      name: "",
      currentProfile: "",
      redirectAuth: false,
      notification: "",
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
    setProfiles(state, payload) {
      state.profiles = payload;
    },
    setCurrentProfile(state, payload) {
      state.currentProfile = payload;
    },
    setRedirectAuth(state) {
      state.redirectAuth = !state.redirectAuth;
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
    getProfiles(state) {
      return state.profiles;
    },
    getCurrentProfile(state) {
      return state.currentProfile;
    },
    getRedirectAuth(state) {
      return state.redirectAuth;
    },
  },
  actions: {
    async deleteTheAccount(context) {
      return new Promise((resolve, reject) => {
        deleteUser(context.state.user)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err.code);
          });
      });
    },
    async signUp(context, payload) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, payload.email, payload.password)
          .then((userCredential) => {
            context.commit("authenticate", userCredential);
            // ADD TO DATABASE
            context.dispatch("addProfileUsers", userCredential.user.uid);
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
    async addProfileUsers(_, payload) {
      try {
        await setDoc(doc(db, "users", payload), {
          profiles: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
          },
          mylist: {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
          },
        });
      } catch (e) {
        console.log("did not add users", e);
      }
    },
    async addNameToProfile(context, payload) {
      const id = context.getters.userId;
      try {
        const usersProfileDoc = doc(db, "users", id);
        let dbPath = `profiles.${payload.profile}`;
        await updateDoc(usersProfileDoc, {
          [dbPath]: payload.name,
        });
      } catch (e) {
        console.log("error: ", e);
      }
    },
    async profileNames(context) {
      const id = context.getters.userId;
      const usersRef = doc(db, "users", id);
      const docSnap = await getDoc(usersRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        context.commit("setProfiles", data.profiles);
        return data;
      } else {
        return new Error("db error fetching profiles.");
      }
    },
    currentProfile(context, payload) {
      context.commit("setCurrentProfile", payload);
    },
    redirectUserToAccount(context) {
      context.commit("setRedirectAuth");
    },
  },
});
//***********FREE FUNCTIONS***************
export async function checkAuth() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userId = user.uid;
        resolve(true);
      } else {
        console.log("no-user");
        reject(false);
      }
    });
  });
}
export async function onUpdateProfiles() {
  return new Promise((resolve) => {
    // const unsub =
    onSnapshot(doc(db, "users", userId), (doc) => {
      let data = doc.data();
      resolve(data.profiles);
    });
  });
}

export default store;
