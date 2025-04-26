// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC09sYrTwoumvCJ45Z8COlK9zl996kd4T8",
  authDomain: "reacttest-22498.firebaseapp.com",
  projectId: "reacttest-22498",
  storageBucket: "reacttest-22498.appspot.com",
  messagingSenderId: "1098393079181",
  appId: "1:1098393079181:web:a4bd69e80b2c548eca81c4",
  measurementId: "G-PYM4NK4SY3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
