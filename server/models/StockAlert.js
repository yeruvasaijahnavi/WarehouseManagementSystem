const mongoose = require("mongoose");

const stockAlertSchema = new mongoose.Schema(
	{
		itemId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Inventory", // Reference to the Inventory model
			required: true,
		},
		threshold: {
			type: Number,
			required: true,
		},
		alertDate: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			enum: ["active", "resolved"],
			default: "active",
		},
	},
	{ timestamps: true }
);

const StockAlert = mongoose.model("StockAlert", stockAlertSchema);

module.exports = StockAlert;
