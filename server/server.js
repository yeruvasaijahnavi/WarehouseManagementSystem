const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");
const orderRoutes = require("./routes/orders");
const orderProcessingRoutes = require("./routes/orderProcessing");
const alertRoutes = require("./routes/alerts"); // Add alert routes
const staffRoutes = require("./routes/staff");
const logRoutes = require("./routes/logs"); // Add log routes
const dashboardRoutes = require("./routes/dashboard"); // Add log routes
// require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());
// Connect to MongoDB
mongoose
	.connect(
		"mongodb+srv://yeruvasaijahnavi:DQiNH5gMYA7nfdpH@cluster0.i4dvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Use the routes
app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/orders", orderRoutes);
app.use("/orderProcessing", orderProcessingRoutes);
app.use("/alerts", alertRoutes); // Add alert routes
app.use("/staff", staffRoutes);
app.use("/logs", logRoutes); // Add log routes
app.use("/dashboard", dashboardRoutes); // Add log routes
// Test route
app.get("/", (req, res) => {
	res.send("Warehouse Management System Backend is Running! rm cors");
});

// Example middleware for logging errors
app.use((err, req, res, next) => {
	console.error(err.stack); // Log the error to the console
	res.status(500).send("Internal Server Error");
});

// app.listen(3000, () => {
// 	console.log(`Server is running on port 3000`);
// });

module.exports = app;
