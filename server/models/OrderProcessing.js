// models/OrderProcessing.js
const mongoose = require("mongoose");

const orderProcessingSchema = new mongoose.Schema({
	orderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order", // Linking to the Order model
		required: true,
	},
	status: {
		type: String,
		enum: [
			"received",
			"in progress",
			"packed",
			"shipped",
			"delivered",
			"canceled",
		],
		default: "received", // Initial status when order is placed
	},
	startDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	completionDate: {
		type: Date,
	},
	staffId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Assuming staff is a user in the system
		required: true,
	},
});

module.exports = mongoose.model("OrderProcessing", orderProcessingSchema);
