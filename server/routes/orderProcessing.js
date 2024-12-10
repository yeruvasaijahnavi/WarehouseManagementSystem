const OrderProcessing = require("../models/OrderProcessing");
const express = require("express");
const Order = require("../models/Order");
const { createLog } = require("../services/logService");
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

router.get("/:id", authorizeUser("staff"), async (req, res) => {
	try {
		const orderProcessingHistory = await OrderProcessing.find({
			orderId: req.params.id,
		})
			.populate("staffId", "username") // Assuming 'staffId' is a user model with a 'username' field
			.sort({ startDate: 1 });

		if (!orderProcessingHistory.length) {
			return res.status(404).json({
				message: "No processing history found for this order",
			});
		}

		// Here, you can include the current status from the Order
		const order = await Order.findOne({ orderId: req.params.id });

		res.status(200).json({
			orderProcessingHistory,
			orderStatus: order.status, // Add the status of the order
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
