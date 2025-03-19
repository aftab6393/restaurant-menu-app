// Import Firebase modules
import { auth } from "./firebase-config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");

    if (!logoutBtn) {
        console.error("🚨 Logout button NOT FOUND in the DOM!");
        return;
    }

    // ✅ Show Logout Button Only if User is Signed In
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("✅ User is logged in:", user.email);
            logoutBtn.style.display = "block"; // Show logout button
        } else {
            console.log("🚨 No user logged in. Redirecting...");
            window.location.href = "signin.html"; // Redirect if no user
        }
    });

    // ✅ Logout Button Click Event
    logoutBtn.addEventListener("click", async () => {
        console.log("⚡ Logout button clicked!");

        try {
            await signOut(auth);
            alert("✅ Logged out successfully!");
            window.location.href = "signin.html"; // Redirect to Sign In page
        } catch (error) {
            console.error("🚨 Logout Error:", error);
            alert("❌ Logout failed! Check console for details.");
        }
    });
});
