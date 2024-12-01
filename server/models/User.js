const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema
const userSchema = new mongoose.Schema({
	userId: { type: String, unique: true },
	username: { type: String, unique: true, required: true },
	passwordHash: { type: String, required: true },
	role: { type: String, required: true, enum: ["admin", "staff"] },
	email: { type: String, required: true },
	isActive: { type: Boolean, default: true },
});

// Method to compare password hash with the provided password
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.passwordHash);
};

// Hash password before saving
userSchema.pre("save", async function (next) {
	if (this.isModified("passwordHash")) {
		this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
	}
	next();
});

module.exports = mongoose.model("User", userSchema);
