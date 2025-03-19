// Import Firebase authentication module
import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // If the user is NOT logged in, redirect to Sign-In
        window.location.href = "signin.html";
    }
});
