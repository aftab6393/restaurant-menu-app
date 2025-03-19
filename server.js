const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;
const menuFile = "menu.json";

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); // Serve static files

// Serve index.html on root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Function to load menu data from file
const fetchMenuFromDB = () => {
    if (fs.existsSync(menuFile)) {
        return JSON.parse(fs.readFileSync(menuFile));
    }
    return [];
};

// Function to save menu data to file
const saveMenu = (data) => {
    fs.writeFileSync(menuFile, JSON.stringify(data, null, 2));
};

// API to get all menu items
app.get("/menu", (req, res) => {
    res.json(fetchMenuFromDB());
});

// API to add a new menu item
app.post("/menu", (req, res) => {
    const menu = fetchMenuFromDB();
    const newItem = req.body;
    newItem.id = menu.length + 1;
    menu.push(newItem);
    saveMenu(menu);
    res.status(201).json(newItem);
});

// API to place an order
app.post("/order", (req, res) => {
    const order = req.body;
    console.log("New Order Received:", order);
    res.status(201).json({ message: "Order placed successfully!", order });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
