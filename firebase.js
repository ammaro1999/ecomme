// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChzJR8-Hh76xYtKqfrq4KG-BhkkRVwfpg",
  authDomain: "ideashop-2e338.firebaseapp.com",
  projectId: "ideashop-2e338",
  storageBucket: "ideashop-2e338.appspot.com",
  messagingSenderId: "789325555270",
  appId: "1:789325555270:web:55c7c68393df2ffd6f0c47",
  measurementId: "G-NF122WSCMC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app); // Only needed if you're using Analytics

// Exports
export { auth, db, storage, analytics };
export default app;
