import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const logoutBtn = document.getElementById("logout-btn");
const signinBtn = document.getElementById("signin-btn");
const signupBtn = document.getElementById("signup-btn");

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        logoutBtn.classList.remove("d-none");
        signinBtn.classList.add("d-none");
        signupBtn.classList.add("d-none");
    } else {
        logoutBtn.classList.add("d-none");
        signinBtn.classList.remove("d-none");
        signupBtn.classList.remove("d-none");
    }
});

// Logout functionality
logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    window.location.href = "signin.html"; // Redirect to sign-in page
});
