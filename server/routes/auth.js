const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
	const { username, password, email, role } = req.body;

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists!" });
		}

		// Create a new user
		const newUser = new User({
			username,
			passwordHash: password,
			email,
			role,
		});
		await newUser.save();

		res.status(201).json({ message: "User created successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

const jwt = require("jsonwebtoken");

// User Login Route
router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Find the user by username
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Compare password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user.userId, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
