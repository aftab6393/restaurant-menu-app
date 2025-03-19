// Import Firebase modules
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById("signin-form");
    const signInBtn = document.getElementById("signin-btn");
    const errorMessage = document.getElementById("error-message");
    const btnText = document.getElementById("btn-text");
    const loadingSpinner = document.getElementById("loading-spinner");

    if (!signInForm || !signInBtn) {
        console.error("Sign-in form or button not found!");
        return; // Stop execution if elements are missing
    }

    signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Clear previous error message
        errorMessage.textContent = "";

        if (!email || !password) {
            errorMessage.textContent = "Both email and password are required.";
            return;
        }

        try {
            // Show loading state
            if (signInBtn && btnText && loadingSpinner) {
                signInBtn.disabled = true;
                btnText.textContent = "Signing in...";
                loadingSpinner.classList.remove("d-none");
            }

            // Firebase authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert("Sign In Successful!");

            // Redirect after successful sign-in
            window.location.href = "index.html";
        } catch (error) {
            console.error("Sign-In Error:", error);

            // Firebase authentication error handling
            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage.textContent = "Invalid email format.";
                    break;
                case "auth/user-not-found":
                    errorMessage.textContent = "No account found with this email.";
                    break;
                case "auth/wrong-password":
                    errorMessage.textContent = "Incorrect password.";
                    break;
                default:
                    errorMessage.textContent = error.message;
            }
        } finally {
            // Reset button state
            if (signInBtn && btnText && loadingSpinner) {
                signInBtn.disabled = false;
                btnText.textContent = "Sign In";
                loadingSpinner.classList.add("d-none");
            }
        }
    });
});
