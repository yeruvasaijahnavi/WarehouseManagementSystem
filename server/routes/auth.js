const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Staff = require("../models/Staff");

router.post("/register", async (req, res) => {
	const { username, password, email, role, name } = req.body;

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists!" });
		}

		const generateUserId = () => {
			const randomDigits = Math.floor(100 + Math.random() * 900); // Generates a random 3 digit number
			return `U${randomDigits}`;
		};

		const userId = generateUserId();

		// Randomly assign staff role and shift if the user is a staff
		let staff = null;
		if (role === "staff") {
			// Randomly assign role and shift
			const staffRoles = ["operator", "packer"];
			const staffShifts = ["Morning", "Evening", "Night"];

			const staffRole =
				staffRoles[Math.floor(Math.random() * staffRoles.length)];
			const staffShift =
				staffShifts[Math.floor(Math.random() * staffShifts.length)];

			staff = new Staff({
				staffId: `S${Math.floor(1000 + Math.random() * 9000)}`, // Random 4-digit staff ID
				name: name,
				role: staffRole,
				email,
				shift: staffShift,
			});
			await staff.save(); // Save the staff member
		}

		// Create a new user
		const newUser = new User({
			userId,
			username,
			passwordHash: password,
			email,
			role,
			staff: staff ? staff._id : null, // Link staff if created
		});
		await newUser.save();

		res.status(201).json({ message: "User created successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
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
			{ userId: user.userId, username: user.username, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);
		// Assuming you are decoding the token somewhere in your backend
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		console.log("Backend:", decodedToken); // This should include username, userId, role, etc.

		res.status(200).json({ token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
