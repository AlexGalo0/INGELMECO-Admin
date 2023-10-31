import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTCLkNBXmX9ibA7_ndC7R0h77RKXRZfyU",
  authDomain: "test-admin-app-1cb81.firebaseapp.com",
  projectId: "test-admin-app-1cb81",
  storageBucket: "test-admin-app-1cb81.appspot.com",
  messagingSenderId: "832034090698",
  appId: "1:832034090698:web:974505253806289bdb8e33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
