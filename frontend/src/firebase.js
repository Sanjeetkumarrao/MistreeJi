// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSKwywmBiAlJJ3iobpRyiDNMNHs9ycZ1M",
  authDomain: "mistreeji-c2dfb.firebaseapp.com",
  projectId: "mistreeji-c2dfb",
  storageBucket: "mistreeji-c2dfb.firebasestorage.app",
  messagingSenderId: "1028482902546",
  appId: "1:1028482902546:web:a1aa21c346d10daeb806cb",
  measurementId: "G-GZ7GLD8DYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);