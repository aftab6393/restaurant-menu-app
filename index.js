function displayMenu(items) {
    const menuContainer = document.getElementById("menu-items");
    menuContainer.innerHTML = "";

    items.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("col-lg-4", "col-md-6", "col-sm-12", "menu-item");

        menuItem.innerHTML = `
            <div class="card">
                <img src="${item.img}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${item.price}</h6>
                    <p class="card-text">${item.description}</p>
                    <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });
}

// Function to add item to cart
function addToCart(itemId) {
    const selectedItem = menu.find(item => item.id === itemId);
    
    if (!selectedItem) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item is already in cart
    let itemIndex = cart.findIndex(item => item.id === selectedItem.id);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ ...selectedItem, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${selectedItem.title} added to cart!`);
}
