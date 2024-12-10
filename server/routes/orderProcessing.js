const OrderProcessing = require("../models/OrderProcessing");
const express = require("express");
const Order = require("../models/Order");
const Logs = require("../models/Log");
const authorizeUser = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		// Fetch all order processing details
		const orderProcessingDetails = await OrderProcessing.find()
			.populate({
				path: "orderId",
				select: "orderId status", // Select the orderId and status fields from Order model
				populate: {
					path: "assignedStaff", // Populate the assignedStaff field inside Order model
					select: "name", // Select the username from the Staff model
				},
			})
			.sort({ startDate: 1 }); // Optional: Sort by start date to view in chronological order

		if (!orderProcessingDetails.length) {
			return res
				.status(404)
				.json({ message: "No order processing details found" });
		}

		res.status(200).json(orderProcessingDetails);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});
router.get("/:id", authorizeUser(["staff", "admin"]), async (req, res) => {
	try {
		// Fetch the order by orderId
		const order = await Order.findOne({ orderId: req.params.id })
			.populate("assignedStaff", "name email role") // Populate staff details
			.exec();

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		// Fetch processing history for the order
		const processingHistory = await OrderProcessing.find({
			orderId: order._id,
		})
			.sort({ startDate: 1 })
			.exec();

		// Fetch audit logs related to the order
		const auditLogs = await Logs.find({
			itemType: "Order", // Ensure it's related to an order
			itemId: order._id, // Match the itemId with the current order
		})
			.sort({ actionDate: 1 }) // Sort by actionDate
			.exec();

		// Return the order, processing history, and audit logs
		res.status(200).json({
			order,
			processingHistory,
			auditLogs, // Include the audit logs in the response
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

module.exports = router;
