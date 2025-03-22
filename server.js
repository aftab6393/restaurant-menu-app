require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const path = require("path");
const admin = require("firebase-admin");

// Initialize Firebase using environment variables
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix newline issue
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: "https://your-project-id.firebaseio.com",
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); 

// Serve index.html on root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Fetch menu from Firestore
app.get("/menu", async (req, res) => {
    try {
        const menuSnapshot = await db.collection("menu").get();
        const menu = menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch menu" });
    }
});

// Add a new menu item
app.post("/menu", async (req, res) => {
    try {
        const newItem = req.body;
        const docRef = await db.collection("menu").add(newItem);
        res.status(201).json({ id: docRef.id, ...newItem });
    } catch (error) {
        res.status(500).json({ error: "Failed to add menu item" });
    }
});

// Place an order
app.post("/order", async (req, res) => {
    try {
        const order = req.body;
        const docRef = await db.collection("orders").add(order);
        console.log("New Order Received:", order);
        res.status(201).json({ message: "Order placed successfully!", orderId: docRef.id });
    } catch (error) {
        res.status(500).json({ error: "Failed to place order" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
