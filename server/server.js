const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");
const orderRoutes = require("./routes/orders");
const alertRoutes = require("./routes/alerts"); // Add alert routes
const staffRoutes = require("./routes/staff");
const { checkLowStock } = require("./services/stockAlertService"); // Import the service

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Use the routes
app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/orders", orderRoutes);
app.use("/alerts", alertRoutes); // Add alert routes
app.use("/staff", staffRoutes);
// Test route
app.get("/", (req, res) => {
	res.send("Warehouse Management System Backend is Running!");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
