import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXX",
  authDomain: "normal-website-9.firebaseapp.com",
  projectId: "normal-website-9",
  storageBucket: "normal-website-9.appspot.com",
  messagingSenderId: "XXXXXXXX",
  appId: "1:XXXX:web:XXXX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);