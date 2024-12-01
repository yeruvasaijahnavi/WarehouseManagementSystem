const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
	orderId: { type: String, unique: true, required: true },
	customerId: { type: String, required: true },
	sku: { type: String, required: true },
	quantity: { type: Number, required: true },
	status: {
		type: String,
		required: true,
		enum: ["pending", "in progress", "shipped", "delivered"],
		default: "pending",
	},
	shippingAddress: { type: String, required: true },
	orderDate: { type: Date, default: Date.now },
});

// Order Model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
