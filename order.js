const menu = [
    { id: 1, title: "Chicken Biryani", price: 199, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6AlsY64CMBtlrPiP137YFtHq-asKTix06Q&s" },
    { id: 2, title: "Sushi Platter", price: 129, img: "https://media.istockphoto.com/id/1224916255/photo/sushi-maki-with-salmon-shrimp-cucumber.jpg?s=612x612&w=0&k=20&c=qIu0V_qKpP1R2xWMxID0tRGPDhOivHQ9CJFiZLcXpI8=" },
    { id: 3, title: "Cold Coffee", price: 99, img: "https://tvanamm.com/wp-content/uploads/2024/01/Cold-Coffee.jpg" },
    { id: 4, title: "Chocolate Cake", price: 119, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb_4cZ6oX0NziBxgUPrlt4hxokwKXIhekw6Q&s" },
    { id: 5, title: "Grilled Chicken", price: 449, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToMozkkZv6pQonP3nn1BlXT2uLTWJxeshxYA&s" },
    { id: 6, title: "Pasta Alfredo", price: 149, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCUw58u2Ag2-HS5wSVhiuliU6rjAWdqFelMw&s" },
    { id: 7, title: "Cheeseburger", price: 199, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp5v5bdXryvZnpXyH4kBOOB7oU6PYhRivhQ&s" }
];

function displayMenuOnline() {
    let orderContainer = document.getElementById("order-online-container");

    if (!orderContainer) {
        console.error("❌ Error: #order-online-container not found in DOM!");
        return;
    }

    orderContainer.innerHTML = ""; // Clear container before adding new items

    menu.forEach(item => {
        let menuItem = document.createElement("div");
        menuItem.classList.add("col-lg-4", "col-md-6", "col-sm-12", "menu-item");

        menuItem.innerHTML = `
            <div class="card">
                <img src="${fallbacks.jpg}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">₹${item.price}</h6>
                    <button class="btn btn-primary add-to-cart" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-img="${item.img}">Add to Cart</button>
                </div>
            </div>
        `;
        orderContainer.appendChild(menuItem);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

function addToCart(event) {
    let button = event.target;
    let item = {
        id: button.getAttribute("data-id"),
        title: button.getAttribute("data-title"),
        price: parseFloat(button.getAttribute("data-price")),
        img: button.getAttribute("data-img"),
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${item.title} added to cart!`);
    console.log("Cart:", cart);
}

document.addEventListener("DOMContentLoaded", displayMenuOnline);
