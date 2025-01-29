// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn7HaC7x3SRv0ZXc1en2wbpjg88gBMqdo",
  authDomain: "jnt-website-74c1d.firebaseapp.com",
  projectId: "jnt-website-74c1d",
  storageBucket: "jnt-website-74c1d.appspot.com",
  messagingSenderId: "78464640390",
  appId: "1:78464640390:web:1cc16c86d1ca91e4a97807",
  measurementId: "G-WYR13YT17M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

export {
  db,
  storage,
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
