const express = require("express");
const Order = require("../models/Order");
const { createLog } = require("../services/logService");
const authorizeUser = require("../middleware/auth");
const router = express.Router();

// Create a new order (POST /orders)
router.post("/", authorizeUser("admin"), async (req, res) => {
	try {
		const { orderId, customerId, sku, quantity, shippingAddress } =
			req.body;

		// Create a new order
		const newOrder = new Order({
			orderId,
			customerId,
			sku,
			quantity,
			shippingAddress,
		});

		await newOrder.save();

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
router.get("/", authorizeUser("staff"), async (req, res) => {
	try {
		const orders = await Order.find();

		// Create an audit log for fetching all orders
		await createLog("fetch", null, req.user.userId, "Fetched all orders");

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
router.get("/:id", authorizeUser("staff"), async (req, res) => {
	try {
		const order = await Order.findOne({ orderId: req.params.id });
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		// Create an audit log for fetching an order by ID
		await createLog(
			"fetch",
			order._id,
			req.user.userId,
			`Fetched order with ID: ${req.params.id}`
		);

		res.status(200).json(order);
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
