import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcLH_RC6BRg6msAEDfERJDuTmridJC9CQ",
    authDomain: "resume-builder-7c315.firebaseapp.com",
    projectId: "resume-builder-7c315",
    storageBucket: "resume-builder-7c315.appspot.com",
    messagingSenderId: "882597826972",
    appId: "1:882597826972:web:2ad73738f1a1cdaecbf859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { app, auth, db }; // ✅ Now exporting `app`, `auth`, and `db`
