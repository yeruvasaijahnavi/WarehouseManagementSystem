// models/OrderProcessing.js
const mongoose = require("mongoose");

const orderProcessingSchema = new mongoose.Schema({
	orderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
		required: true,
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
		ref: "Staff", // Linking to the Staff model
	},
});

module.exports = mongoose.model("OrderProcessing", orderProcessingSchema);
