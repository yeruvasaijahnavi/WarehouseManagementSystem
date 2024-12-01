const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);

// Test route
app.get("/", (req, res) => {
	res.send("Warehouse Management System Backend is Running!");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
