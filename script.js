function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartContainer.innerHTML = "";
    let totalAmount = 0;

    cart.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.img}" width="50"></td>
            <td>${item.title}</td>
            <td>₹${item.price}</td>
            <td>
                <button class="btn btn-sm btn-secondary decrease" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm btn-secondary increase" data-index="${index}">+</button>
            </td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm remove" data-index="${index}">Remove</button></td>
        `;
        cartContainer.appendChild(row);
        totalAmount += item.price * item.quantity;
    });

    cartTotal.innerText = `Total: ₹${totalAmount.toFixed(2)}`;

    // Attach event listeners for buttons
    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", removeFromCart);
    });

    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", increaseQuantity);
    });

    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", decreaseQuantity);
    });
}

function removeFromCart(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = event.target.dataset.index;
    
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function increaseQuantity(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = event.target.dataset.index;

    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function decreaseQuantity(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = event.target.dataset.index;

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.addEventListener("DOMContentLoaded", function () {
    loadCart(); // Load cart on page load
});
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
