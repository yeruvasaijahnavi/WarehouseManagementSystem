const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
	orderId: { type: String, unique: true, required: true },
	customerId: { type: String, required: true },
	inventoryItem: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Inventory", // Reference to the Inventory model
		required: true, // Orders must have an associated inventory item
	},
	quantity: { type: Number, required: true },
	status: {
		type: String,
		required: true,
		enum: [
			"pending",
			"assigned",
			"packed",
			"shipped",
			"delivered",
			"canceled",
		],
		default: "pending",
	},
	shippingAddress: { type: String, required: true },
	orderDate: { type: Date, default: Date.now },
	assignedStaff: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Staff", // Reference to the Staff model
		required: false, // Not required because an order might not be assigned initially
	},
});

// Order Model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
