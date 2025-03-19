import { auth } from "./firebase-config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const resetForm = document.getElementById("forgot-password-form");
    const resetBtn = document.getElementById("reset-btn");
    const btnText = document.getElementById("btn-text");
    const loadingSpinner = document.getElementById("loading-spinner");
    const errorMessage = document.getElementById("error-message");

    resetForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("reset-email").value.trim();
        errorMessage.textContent = "";

        if (!email) {
            errorMessage.textContent = "Please enter your email.";
            return;
        }

        try {
            // ✅ Disable button and show loading state
            resetBtn.disabled = true;
            btnText.textContent = "Sending...";
            loadingSpinner.classList.remove("d-none");

            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent! Check your inbox.");

            // ✅ Redirect to Sign-In Page after success
            window.location.href = "signin.html";
        } catch (error) {
            console.error("Password Reset Error:", error);
            errorMessage.textContent = error.message;
        } finally {
            // ✅ Re-enable button
            resetBtn.disabled = false;
            btnText.textContent = "Send Reset Link";
            loadingSpinner.classList.add("d-none");
        }
    });
});
