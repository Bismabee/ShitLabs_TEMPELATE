// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBijNmbn_rDiDvdUBLANkb4M0fYlUMVnYg",
  authDomain: "tattoogenie-f255a.firebaseapp.com",
  projectId: "tattoogenie-f255a",
  storageBucket: "tattoogenie-f255a.firebasestorage.app",
  messagingSenderId: "356100139338",
  appId: "1:356100139338:web:4c1c9282315a9b236b39b3",
  measurementId: "G-75R15RMQVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const appId = firebaseConfig.projectId;