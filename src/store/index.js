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
  sendPasswordResetEmail,
} from "firebase/auth";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
const theObj = {
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
  profileImages: {
    one: 21,
    two: 21,
    three: 21,
    four: 21,
    five: 21,
  },
};
const store = createStore({
  state() {
    return {
      user: "",
      userId: null,
      email: "",
      displayName: "",
      name: "",
      identifier: null,
      redirectAuth: false,
      notification: "",
      heroMaterial: {},
      profiles: null,
      profileImages: { one: 1, two: 1, three: 1, four: 1, five: 1 },
      mylist: { one: [], two: [], three: [], four: [], five: [] },
    };
  },

  mutations: {
    authenticate(state, payload) {
      state.user = payload.user ? payload.user : false;
      state.userId = payload.user.uid;
      state.email = payload.user.email;
      state.displayName = payload.user.displayName;
    },

    logOut(state) {
      state.user = null;
      state.userId = null;
      state.email = null;
      state.name = null;
      state.displayName = "";
      state.notification = "";
      state.profiles = null;
    },

    changeName(state, payload) {
      state.name = payload.name;
    },

    emailChange(state, payload) {
      state.email = payload;
    },

    setData(state, payload) {
      state.profiles = {
        ...(payload.profiles || {}),
      };
      state.profileImages = {
        ...(payload.profileImages || {}),
      };
      state.mylist = {
        ...(payload.mylist || {}),
      };
    },

    setCurrentIdentifier(state, payload) {
      state.identifier = payload;
    },

    setRedirectAuth(state, payload = null) {
      if (payload) {
        state.redirectAuth = false;
      } else {
        state.redirectAuth = payload;
      }
    },

    setHeroMaterial(state, payload) {
      state.heroMaterial = payload;
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
    getIdentifier(state) {
      return state.identifier;
    },
    getDisplayName(state) {
      return state.displayName;
    },
    getProfiles(state) {
      return state.profiles;
    },
    getProfileImages(state) {
      return state.profileImages;
    },
    getMyList(state) {
      return state.mylist;
    },
    getRedirectAuth(state) {
      return state.redirectAuth;
    },
    getHeroMaterial(state) {
      return state.heroMaterial;
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
            deleteDoc(doc(db, "users", user)).catch((err) => {
              console.error("error document delete: ", err);
            });
          })
          .catch((err) => {
            reject(err.code);
          });
      });
    },

    async resetPassword(context, payload) {
      return new Promise((resolve, reject) => {
        sendPasswordResetEmail(auth, payload)
          .then(() => {
            resolve(
              "Success, send reset password instructions to email! Check both spam and primary inbox."
            );
          })
          .catch((err) => {
            console.error(err);
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

    async logOutVisitor(context) {
      return new Promise((resolve, reject) => {
        signOut(auth)
          .then(() => {
            context.commit("logOut");
          })
          .catch((err) => {
            reject(`Failed logout: ${err}`);
          });
      });
    },

    async deleteProfile(context, profile) {
      const user = context.getters.userId;
      const usersRef = doc(db, "users", user);
      let dbNamePath = `profiles.${profile}`;
      let dbListPath = `mylist.${profile}`;
      let dbImagePath = `profileImages.${profile}`;
      await updateDoc(usersRef, {
        [dbNamePath]: "",
        [dbListPath]: [],
        [dbImagePath]: 21,
      }).catch((err) => {
        console.error("Error deleting profile: ", err);
      });
    },

    authenticate(context, payload) {
      return new Promise((resolve, reject) => {
        if (payload.user) {
          context.commit("authenticate", { user: payload.user });
          context.dispatch("fetchMyList");
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
        await setDoc(doc(db, "users", payload), theObj);
      } catch (e) {
        console.error("did not add users", e);
      }
    },

    async addNameToProfile(context, { identifier, name }) {
      const id = context.getters.userId;
      try {
        const usersProfileDoc = doc(db, "users", id);
        let dbPath = `profiles.${identifier}`;
        await updateDoc(usersProfileDoc, {
          [dbPath]: name,
        });
      } catch (e) {
        console.error("error: ", e);
      }
    },

    async addProfile(context, payload) {
      const id = context.getters.userId;
      try {
        const usersProfileDoc = doc(db, "users", id);
        let dbPath = `profiles.${payload.profile}`;
        await updateDoc(usersProfileDoc, {
          [dbPath]: payload.name,
        });
      } catch (e) {
        console.error("error: ", e);
      }
    },

    async addProfileImageId(context, payload) {
      const id = context.getters.userId;
      try {
        const usersProfileDoc = doc(db, "users", id);
        let dbPath = `profileImages.${payload.profile}`;
        const res = await updateDoc(usersProfileDoc, {
          [dbPath]: payload.imageId,
        });
        console.log("Result", res);
      } catch (e) {
        console.error("error: ", e);
      }
    },

    async addMyList(context, payload) {
      const id = context.getters.userId;
      try {
        const usersProfileDoc = doc(db, "users", id);
        let dbPath = `mylist.${payload.identifier}`;
        await updateDoc(usersProfileDoc, {
          [dbPath]: arrayUnion(payload.videoId),
        });
      } catch (e) {
        console.error("error: ", e);
      }
    },

    async removeFromMyList(context, payload) {
      const id = context.getters.userId;
      try {
        const usersProfileDoc = doc(db, "users", id);
        let dbPath = `mylist.${payload.identifier}`;
        await updateDoc(usersProfileDoc, {
          [dbPath]: arrayRemove(payload.videoId),
        });
      } catch (e) {
        console.error("error: ", e);
      }
    },

    async fetchMyList(context) {
      const id = context.getters.userId;
      const usersRef = doc(db, "users", id);
      const docSnap = await getDoc(usersRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        context.commit("setData", {
          profiles: data.profiles,
          profileImages: data.profileImages,
          mylist: data.mylist,
        });
        return {
          profiles: data.profiles,
          mylist: data.mylist,
          profileImages: data.profileImages,
        };
      } else {
        console.error("db error fetching profiles.");
      }
    },

    currentIndentifier(context, payload) {
      context.commit("setCurrentIdentifier", payload);
    },

    redirectUserToAccount(context, payload) {
      context.commit("setRedirectAuth", payload);
    },

    putHeroMaterial(context, payload) {
      context.commit("setHeroMaterial", payload);
    },

    async loginAsVisitor(context) {
      return new Promise((resolve, reject) => {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            //MYOWNEMAIL&PASSWORD
            return signInWithEmailAndPassword(
              auth,
              "militoarturo@gmail.com",
              "@123456"
            );
          })
          .then((userCredential) => {
            context.commit("authenticate", userCredential);
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      });
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
        console.error("no-user");
        reject(false);
      }
    });
  });
}
export default store;
