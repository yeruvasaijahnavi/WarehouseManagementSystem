const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");

// Create a new staff member (POST /staff)
router.post("/", async (req, res) => {
	try {
		const { staffId, name, role, email, shift, status } = req.body;

		const newStaff = new Staff({
			staffId,
			name,
			role,
			email,
			shift,
			status,
		});
		await newStaff.save();

		res.status(201).json({
			message: "Staff member added successfully",
			staff: newStaff,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Get all staff members (GET /staff)
router.get("/", async (req, res) => {
	try {
		const staffMembers = await Staff.find();
		res.status(200).json(staffMembers);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Get a specific staff member by ID (GET /staff/:id)
router.get("/:id", async (req, res) => {
	try {
		const staff = await Staff.findOne({ staffId: req.params.id });

		if (!staff) {
			return res.status(404).json({ message: "Staff member not found" });
		}

		res.status(200).json(staff);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Update staff member details (PUT /staff/:id)
router.put("/:id", async (req, res) => {
	try {
		const { name, role, email, shift, status } = req.body;

		const updatedStaff = await Staff.findOneAndUpdate(
			{ staffId: req.params.id },
			{
				name,
				role,
				email,
				shift,
				status,
			}
		);
		if (!updatedStaff) {
			return res.status(404).json({ message: "Staff member not found" });
		}

		res.status(200).json({
			message: "Staff member updated successfully",
			staff: updatedStaff,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Remove a staff member (DELETE /staff/:id)
router.delete("/:id", async (req, res) => {
	try {
		const deletedStaff = await Staff.findOneAndDelete(req.params.id);

		if (!deletedStaff) {
			return res.status(404).json({ message: "Staff member not found" });
		}

		res.status(200).json({ message: "Staff member removed successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

module.exports = router;
