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
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());
// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
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

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
