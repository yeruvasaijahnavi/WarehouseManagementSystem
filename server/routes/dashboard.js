const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const Order = require("../models/Order");
const StockAlert = require("../models/StockAlert");
const authorizeUser = require("../middleware/auth");

router.get(
	"/inventory-total-value",
	authorizeUser(["admin"]),
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

router.get(
	"/inventory-total-quantity",
	authorizeUser(["admin"]),
	async (req, res) => {
		try {
			const data = await Inventory.aggregate([
				{ $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
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

// Route to get total number of orders
router.get(
	"/orders-total-count",
	authorizeUser(["admin"]),
	async (req, res) => {
		try {
			const totalOrders = await Order.countDocuments();
			res.json({ totalOrders });
		} catch (err) {
			console.error(err);
			res.status(500).json({
				message: "Internal Server Error",
				error: err.message,
			});
		}
	}
);

// Route to get distinct customer count
router.get(
	"/orders-distinct-customers",
	authorizeUser(["admin"]),
	async (req, res) => {
		try {
			const distinctCustomers = await Order.distinct("customerId");
			res.json({ distinctCustomers: distinctCustomers.length });
		} catch (err) {
			console.error(err);
			res.status(500).json({
				message: "Internal Server Error",
				error: err.message,
			});
		}
	}
);
router.get(
	"/orders-status-distribution",
	authorizeUser(["admin"]),
	async (req, res) => {
		try {
			const distribution = await Order.aggregate([
				{
					$group: {
						_id: "$status",
						count: { $sum: 1 },
					},
				},
				{
					$project: {
						status: "$_id",
						count: 1,
						_id: 0,
					},
				},
			]);

			res.json(distribution);
		} catch (err) {
			console.error(err);
			res.status(500).json({
				message: "Internal Server Error",
				error: err.message,
			});
		}
	}
);

// stocks unresolved
router.get("/alerts-unresolved", authorizeUser(["admin"]), async (req, res) => {
	try {
		const unresolvedCount = await StockAlert.countDocuments({
			status: "active",
		});
		res.json({ unresolvedCount });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});
module.exports = router;
