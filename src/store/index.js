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
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { db } from "../firebase";
// onSnapshot
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  // onSnapshot,
  deleteDoc,
} from "firebase/firestore";
// let userId;
const store = createStore({
  state() {
    return {
      user: "",
      userId: null,
      email: "",
      name: "",
      currentProfile: {name: "", displayName: ""},
      redirectAuth: false,
      notification: "",
      profiles: null,
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
      state.currentProfile = "";
      state.notification = ""
      state.profiles = null;
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
    setRedirectAuth(state, payload = null) {
      if (payload) {
        state.redirectAuth = false;
      } else {
        state.redirectAuth = payload;
      }
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
      const user = context.getters.userId;
      return new Promise((resolve, reject) => {
        deleteUser(context.state.user)
          .then((res) => {
            resolve(res);
            //dispatch delete document
            deleteDoc(doc(db, "users", user))
              .then(() => {
                console.log("deleted document");
              })
              .catch((err) => {
                console.log("error document delete: ", err);
              });
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
            reject(err.code);
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
    async updateThePassword(context, payload) {
      return new Promise((resolve, reject) => {
        updatePassword(context.state.user, payload)
          .then(() => {
            resolve("Success updated password");
          })
          .catch((err) => {
            reject(err.code);
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
        return data.profiles;
      } else {
        return new Error("db error fetching profiles.");
      }
    },
    currentProfile(context, payload) {
      context.commit("setCurrentProfile", payload);
    },
    redirectUserToAccount(context, payload) {
      context.commit("setRedirectAuth", payload);
    },
  },
});
//***********FREE FUNCTIONS***************
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
//DISABLED
// export async function onUpdateProfiles() {
//     return new Promise((resolve, reject) => {
//       onSnapshot(doc(db, "users", userId), (doc) => {
//         let data = doc.data();
//         if (data) {
//           resolve(data.profiles);
//         } else {
//           reject(false);
//         }
//       });
//     });
// }

export default store;