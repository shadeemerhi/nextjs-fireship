import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN2yVp3ufVL1Ve1ZhTVO0YUhdlz3bdPbE",
  authDomain: "nextjs-fireship-8e963.firebaseapp.com",
  projectId: "nextjs-fireship-8e963",
  storageBucket: "nextjs-fireship-8e963.appspot.com",
  messagingSenderId: "648940675391",
  appId: "1:648940675391:web:48ebef2b5a65a5756f338a",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
