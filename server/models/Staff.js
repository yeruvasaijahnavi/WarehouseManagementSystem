const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
	{
		staffId: { type: String, unique: true, required: true },
		name: { type: String, required: true },
		role: {
			type: String,
			required: true,
			enum: ["operator", "packer"],
		},
		email: { type: String, required: true, unique: true },
		shift: { type: String, required: true }, // e.g., "Morning", "Evening", "Night"
		status: {
			type: String,
			required: true,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
