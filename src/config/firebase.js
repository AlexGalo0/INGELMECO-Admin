// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTCLkNBXmX9ibA7_ndC7R0h77RKXRZfyU",
  authDomain: "test-admin-app-1cb81.firebaseapp.com",
  projectId: "test-admin-app-1cb81",
  storageBucket: "test-admin-app-1cb81.appspot.com",
  messagingSenderId: "832034090698",
  appId: "1:832034090698:web:974505253806289bdb8e33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);