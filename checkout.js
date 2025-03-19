document.addEventListener("DOMContentLoaded", function () {
    let checkoutBtn = document.getElementById("checkout-btn");

    if (!checkoutBtn) {
        console.error("❌ Error: #checkout-btn not found in DOM!");
        return;
    }

    checkoutBtn.addEventListener("click", function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Check if Razorpay is loaded
        if (typeof Razorpay === "undefined") {
            console.error("❌ Error: Razorpay script is not loaded!");
            alert("Payment gateway not available. Please try again later.");
            return;
        }

        var options = {
            key: "rzp_test_YourKeyHere", // Replace with your Razorpay key
            amount: totalAmount * 100, // Convert to paise
            currency: "INR",
            name: "Aftab's Restaurant",
            description: "Order Payment",
            image: "logo.png",
            handler: function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                localStorage.removeItem("cart"); // Clear cart after payment
                window.location.href = "order-success.html";
            },
            prefill: {
                name: "Customer",
                email: "customer@example.com",
                contact: "9999999999"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    });
});
document.getElementById("checkout-btn").addEventListener("click", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    initiatePayment();
});
