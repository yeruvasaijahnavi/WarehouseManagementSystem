const express = require("express");
const Order = require("../models/Order");
const OrderProcessing = require("../models/OrderProcessing");
const { createLog } = require("../services/logService");
const authorizeUser = require("../middleware/auth");
const router = express.Router();
const mongoose = require("mongoose");
// Create a new order (POST /orders)
router.post("/", authorizeUser("admin"), async (req, res) => {
	try {
		const { customerId, sku, quantity, shippingAddress } = req.body;

		const generateOrderId = () => {
			const randomDigits = Math.floor(100 + Math.random() * 900); // Generates a random 3 digit number
			return `O${randomDigits}`;
		};

		const orderId = generateOrderId();
		// Create a new order
		const newOrder = new Order({
			orderId,
			customerId,
			sku,
			quantity,
			shippingAddress,
		});

		await newOrder.save();

		// // Create initial order processing entry
		// const newOrderProcessing = new OrderProcessing({
		// 	orderId: newOrder._id,
		// 	status: "received", // Initial status
		// 	staffId: mongoose.Types.ObjectId(req.user.userId), // Staff handling the order
		// });

		// await newOrderProcessing.save();

		// Create an audit log for the new order
		await createLog(
			"add",
			newOrder._id,
			req.user.userId,
			`Created new order: ${orderId}`
		);

		res.status(201).json({
			message: "Order created successfully",
			order: newOrder,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Get all orders (GET /orders)
router.get("/", async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Get an order by ID (GET /orders/:id)
router.get("/:id", async (req, res) => {
	try {
		const order = await Order.findOne({ orderId: req.params.id });
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.status(200).json(order);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Update the status of an order (PUT /orders/:id/status)
router.put("/:id/status", authorizeUser("staff"), async (req, res) => {
	try {
		const { status } = req.body;

		// Validate status change
		const validStatuses = [
			"received",
			"in progress",
			"packed",
			"shipped",
			"delivered",
			"canceled",
		];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({ message: "Invalid order status" });
		}

		const orderProcessing = await OrderProcessing.findOne({
			orderId: req.params.id,
		});
		if (!orderProcessing) {
			return res
				.status(404)
				.json({ message: "Order processing record not found" });
		}

		// Update the order processing status
		orderProcessing.status = status;
		if (
			status === "shipped" ||
			status === "delivered" ||
			status === "canceled"
		) {
			orderProcessing.completionDate = Date.now();
		}

		await orderProcessing.save();

		// Create an audit log for updating order processing status
		await createLog(
			"update",
			orderProcessing._id,
			req.user.userId,
			`Updated status of order ${req.params.id} to ${status}`
		);

		res.status(200).json({
			message: `Order status updated to ${status}`,
			orderProcessing,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Get the processing history of an order (GET /orders/:id/history)
router.get("/:id/history", authorizeUser("staff"), async (req, res) => {
	try {
		const orderProcessingHistory = await OrderProcessing.find({
			orderId: req.params.id,
		})
			.populate("staffId", "username") // Assuming 'staffId' is a user model with a 'username' field
			.sort({ startDate: 1 }); // Sort by startDate to get processing timeline

		if (!orderProcessingHistory.length) {
			return res.status(404).json({
				message: "No processing history found for this order",
			});
		}

		res.status(200).json(orderProcessingHistory);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Update the status of an order (PUT /orders/:id)
router.put("/:id", authorizeUser("staff"), async (req, res) => {
	try {
		const { status } = req.body;

		// Validate status change
		if (
			!["pending", "in progress", "shipped", "delivered"].includes(status)
		) {
			return res.status(400).json({ message: "Invalid order status" });
		}

		const updatedOrder = await Order.findOneAndUpdate(
			{ orderId: req.params.id },
			{ status },
			{ new: true }
		);

		if (!updatedOrder) {
			return res.status(404).json({ message: "Order not found" });
		}

		// Create an audit log for updating order status
		await createLog(
			"update",
			updatedOrder._id,
			req.user.userId,
			`Updated status of order ID: ${req.params.id} to ${status}`
		);

		res.status(200).json({
			message: "Order status updated",
			order: updatedOrder,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Delete an order (DELETE /orders/:id)
router.delete("/:id", authorizeUser("admin"), async (req, res) => {
	try {
		const deletedOrder = await Order.findOneAndDelete({
			orderId: req.params.id,
		});
		if (!deletedOrder) {
			return res.status(404).json({ message: "Order not found" });
		}

		// Create an audit log for deleting an order
		await createLog(
			"delete",
			deletedOrder._id,
			req.user.userId,
			`Deleted order with ID: ${req.params.id}`
		);

		res.status(200).json({ message: "Order deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

module.exports = router;
