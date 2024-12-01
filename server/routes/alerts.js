const express = require("express");
const StockAlert = require("../models/StockAlert.js");

const router = express.Router();

// GET /alerts - Retrieve all stock alerts
router.get("/", async (req, res) => {
	try {
		const alerts = await StockAlert.find().populate("itemId");
		res.status(200).json(alerts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// POST /alerts - Create a new stock alert manually
router.post("/", async (req, res) => {
	const { itemId, threshold } = req.body;

	try {
		const newAlert = new StockAlert({
			itemId,
			threshold,
		});

		await newAlert.save();
		res.status(201).json({
			message: "Stock alert created successfully",
			newAlert,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// PUT /alerts/:id - Resolve a stock alert
router.put("/:id", async (req, res) => {
	try {
		const alert = await StockAlert.findByIdAndUpdate(
			req.params.id,
			{ status: "resolved" },
			{ new: true }
		);

		if (!alert) {
			return res.status(404).json({ message: "Stock alert not found" });
		}

		res.status(200).json({ message: "Stock alert resolved", alert });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
