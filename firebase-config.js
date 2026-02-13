
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_u9mKhc_GcKUCmmNj49fPqc5KnIJKZYI",
    authDomain: "studio-8371059050-ed147.firebaseapp.com",
    projectId: "studio-8371059050-ed147",
    storageBucket: "studio-8371059050-ed147.firebasestorage.app",
    messagingSenderId: "432141710335",
    appId: "1:432141710335:web:a411aba0fd756bda552dca"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup };
