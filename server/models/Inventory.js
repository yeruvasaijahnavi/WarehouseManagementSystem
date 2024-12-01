const mongoose = require("mongoose");

// Inventory Schema
const inventorySchema = new mongoose.Schema(
	{
		sku: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
		},
		location: {
			type: String,
		},
	},
	{
		timestamps: true, // Optional: Adds createdAt and updatedAt fields
	}
);
// Inventory Model
const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
