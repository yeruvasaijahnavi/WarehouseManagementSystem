const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
	{
		actionType: {
			type: String,
			required: true,
			enum: ["add", "update", "delete"],
		},
		itemType: {
			type: String,
			required: true,
			enum: ["Inventory", "Order"], // To differentiate between Inventory and Order
		},
		itemId: {
			type: mongoose.Schema.Types.ObjectId,
			refPath: "itemType", // Dynamic reference based on itemType
			required: true,
		},

		userId: { type: mongoose.Schema.Types.String, ref: "User" },
		actionDate: { type: Date, default: Date.now },
		description: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
