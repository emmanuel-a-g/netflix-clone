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
  // process.env.API_KEY
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

//Initialize APP
const app = initializeApp(firebaseConfig);
//UPDATED TO V9
//GET AUTHENTICATION
export const auth = getAuth(app);
//GET FIRESTORE DATABASE
export const database = getFirestore(app);
export default app;
