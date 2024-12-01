const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
	{
		actionType: {
			type: String,
			required: true,
			enum: ["add", "update", "delete"],
		},
		itemId: { type: mongoose.Schema.Types.String, ref: "Inventory" },
		userId: { type: mongoose.Schema.Types.String, ref: "User" },
		actionDate: { type: Date, default: Date.now },
		description: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
