// Import Firebase modules
import { auth, db } from "./firebase-config.js"; // ✅ Only import once
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Handle Sign-Up Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get Form Input Values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // ✅ Ensure the button exists before accessing it
    const signUpBtn = document.querySelector("button[type='submit']");
    if (!signUpBtn) {
        console.error("Sign-up button not found.");
        return;
    }

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = ""; // Clear previous errors

    // Basic Form Validations
    if (!firstName || !lastName || !email || !password) {
        errorMessage.textContent = "All fields are required.";
        return;
    }
    if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
        errorMessage.textContent = "Names can only contain letters.";
        return;
    }
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters.";
        return;
    }

    try {
        // Disable the button to prevent multiple clicks
        signUpBtn.disabled = true;
        signUpBtn.innerHTML = "Signing up...";

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update User Profile
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });

        // Store User Info in Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            uid: user.uid,
            createdAt: new Date(),
        });

        alert("Sign Up Successful!");

        // ✅ Redirect to Home Page after Sign-Up
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error signing up:", error);
        if (error.code === "auth/email-already-in-use") {
            errorMessage.textContent = "This email is already registered.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage.textContent = "Invalid email format.";
        } else if (error.code === "auth/weak-password") {
            errorMessage.textContent = "Password is too weak.";
        } else {
            errorMessage.textContent = error.message;
        }
    } finally {
        signUpBtn.disabled = false;
        signUpBtn.innerHTML = "Sign Up";
    }
});
