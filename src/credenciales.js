// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv8lABJS_73hVfizRbGuppA3EEyEDUbC4",
  authDomain: "gameproject-ac623.firebaseapp.com",
  databaseURL: "https://gameproject-ac623-default-rtdb.firebaseio.com",
  projectId: "gameproject-ac623",
  storageBucket: "gameproject-ac623.appspot.com",
  messagingSenderId: "877785062644",
  appId: "1:877785062644:web:f385ca193269984f0492a1"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// const db = getFirestore (appFirebase);
export default appFirebase;
