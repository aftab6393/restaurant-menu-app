function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartContainer || !cartTotal) {
        console.error("❌ Error: Cart elements not found in DOM!");
        return;
    }

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
            <td><img src="${item.img}" width="50" onerror="this.onerror=null;this.src='placeholder.jpg';"></td>
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

// 🛠 Handle Cart Actions (Event Delegation)
document.addEventListener("click", function(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let target = event.target;
    let index = target.getAttribute("data-index");

    if (index === null) return; // Ignore clicks outside buttons

    index = parseInt(index);

    if (target.classList.contains("remove")) {
        cart.splice(index, 1);
    } else if (target.classList.contains("increase")) {
        cart[index].quantity++;
    } else if (target.classList.contains("decrease")) {
        cart[index].quantity > 1 ? cart[index].quantity-- : cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    function updateQuantity(index, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart[index].quantity += change;
    
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);  // Remove item if quantity is 0
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
    
    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
    
});

// ✅ Load cart on page load
document.addEventListener("DOMContentLoaded", loadCart);
function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
document.getElementById("checkout-btn").addEventListener("click", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    initiatePayment();
    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartTable = document.getElementById("cart-items");
        let cartTotal = document.getElementById("cart-total");
    
        cartTable.innerHTML = "";
        
        if (cart.length === 0) {
            cartTable.innerHTML = "<tr><td colspan='6' class='text-center'>Your cart is empty!</td></tr>";
            cartTotal.innerText = "Total: ₹0";
            return;
        }
    
        let total = 0;
        cart.forEach((item, index) => {
            let row = document.createElement("tr");
            let itemTotal = item.price * item.quantity;
            total += itemTotal;
    
            row.innerHTML = `
                <td><img src="${item.img}" width="50" class="rounded"></td>
                <td>${item.title}</td>
                <td>₹${item.price}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button> 
                    ${item.quantity} 
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>₹${itemTotal}</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button></td>
            `;
            cartTable.appendChild(row);
        });
    
        cartTotal.innerText = `Total: ₹${total}`;
    }
    
});
