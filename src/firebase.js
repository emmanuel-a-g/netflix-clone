// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
//V9 APP
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//V9 DATABASE
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGE_ID,
  appId: process.env.VUE_APP_APP_ID,
};

//Initialize APP
const app = initializeApp(firebaseConfig);
//UPDATED TO V9
//GET AUTHENTICATION
export const auth = getAuth(app);
//GET FIRESTORE DATABASE
export const db = getFirestore(app);
export default app;
