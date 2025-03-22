document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotalElement = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<tr><td colspan="6" class="text-center">🛒 Your cart is empty</td></tr>`;
        cartTotalElement.innerText = "Total: ₹0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.img}" alt="${item.title}" width="50"></td>
            <td>${item.title}</td>
            <td>₹${item.price}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="updateQuantity(${index}, -1)">➖</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-success" onclick="updateQuantity(${index}, 1)">➕</button>
            </td>
            <td>₹${itemTotal}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">❌</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotalElement.innerText = `Total: ₹${total}`;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// 🔹 Razorpay Payment Integration
document.getElementById("checkout-btn").addEventListener("click", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("🛒 Your cart is empty!");
        return;
    }

    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100; // Convert to paise (₹1 = 100 paise)

    let options = {
        "key": "YOUR_RAZORPAY_KEY", // 🟢 Replace with your Razorpay API Key
        "amount": totalAmount,
        "currency": "INR",
        "name": "Aftab's Restaurant",
        "description": "Food Order Payment",
        "image": "https://yourwebsite.com/logo.png", // Add your logo
        "handler": function (response) {
            alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
            localStorage.removeItem("cart"); // Clear cart after successful payment
            loadCart();
        },
        "theme": {
            "color": "#28a745"
        }
    };

    let rzp1 = new Razorpay(options);
    rzp1.open();
});
