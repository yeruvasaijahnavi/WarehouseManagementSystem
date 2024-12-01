const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

// Get all audit logs (GET /Logs)
router.get("/", async (req, res) => {
	try {
		const logs = await Log.find().sort({ createdAt: -1 });

		res.status(200).json(logs);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

module.exports = router;
