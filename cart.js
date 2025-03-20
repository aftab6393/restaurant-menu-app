// ✅ Function to load cart from localStorage
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartContainer || !cartTotal) {
        console.error("❌ Error: Cart elements not found in DOM!");
        return;
    }

    console.log("🛒 Loading cart data:", cart);

    cartContainer.innerHTML = "";
    let totalAmount = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<tr><td colspan='6' class='text-center'>🛒 Your cart is empty</td></tr>";
        cartTotal.innerText = `Total: ₹0.00`;
        return;
    }

    cart.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.img}" width="50" onerror="this.onerror=null;this.src='fallback.jpg';"></td>
            <td>${item.title}</td>
            <td>₹${item.price}</td>
            <td>
                <button class="btn btn-sm btn-secondary decrease" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="btn btn-sm btn-secondary increase" data-index="${index}">+</button>
            </td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm remove" data-index="${index}">Remove</button></td>
        `;
        cartContainer.appendChild(row);
        totalAmount += item.price * item.quantity;
    });

    cartTotal.innerText = `Total: ₹${totalAmount.toFixed(2)}`;
}

// ✅ Function to update quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove item if quantity is 0
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ✅ Function to remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ✅ Event delegation for cart actions
document.addEventListener("click", function(event) {
    let target = event.target;
    let index = target.getAttribute("data-index");

    if (index === null) return;
    index = parseInt(index);

    if (target.classList.contains("remove")) {
        removeItem(index);
    } else if (target.classList.contains("increase")) {
        updateQuantity(index, 1);
    } else if (target.classList.contains("decrease")) {
        updateQuantity(index, -1);
    }
});

// ✅ Checkout button functionality
document.getElementById("checkout-btn").addEventListener("click", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    // Proceed to payment (replace this function with your actual payment logic)
    alert("Proceeding to checkout...");
});

// ✅ Ensure cart loads on page load
window.onload = function() {
    console.log("📦 Cart page loaded...");
    loadCart();
};
