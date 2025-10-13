// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "country-view-474417.firebaseapp.com",
  projectId: "country-view-474417",
  storageBucket: "country-view-474417.firebasestorage.app",
  messagingSenderId: "823539004229",
  appId: "1:823539004229:web:9b352307a65c01e6e0042c",
  measurementId: "G-552EFKGBJ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
