const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const authorizeUser = require("../middleware/auth");

router.get(
	"/inventory-total-value",
	authorizeUser("admin"),
	async (req, res) => {
		try {
			const data = await Inventory.aggregate([
				{ $project: { value: { $multiply: ["$quantity", "$price"] } } },
				{ $group: { _id: null, totalValue: { $sum: "$value" } } },
			]);
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({
				message: "Internal Server Error",
				error: err.message,
			});
		}
	}
);

module.exports = router;
