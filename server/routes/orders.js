const express = require("express");
const Order = require("../models/Order");
const OrderProcessing = require("../models/OrderProcessing");
const { createLog } = require("../services/logService");
const authorizeUser = require("../middleware/auth");
const router = express.Router();
const mongoose = require("mongoose");

router.put("/:orderId/assign-staff", async (req, res) => {
	try {
		const { staffId } = req.body;
		const { orderId } = req.params;
		if (!orderId) {
			return res.status(400).json({ message: "Order ID is missing" });
		}
		console.log("Assignings staff", staffId, req.params.orderId);
		const order = await Order.findOneAndUpdate(
			{ orderId: req.params.orderId },
			{ assignedStaff: staffId },
			{ status: "assigned" },
			{ new: true }
		).populate("assignedStaff", "name role email");
		res.status(200).json(order);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: err.message,
		});
	}
});

// create new order
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
		const newOrderProcessing = new OrderProcessing({
			orderId: newOrder._id,
		});

		await newOrderProcessing.save();

		// Create an audit log for the new order
		await createLog(
			"add",
			"Order",
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
		const orders = await Order.find().populate(
			"assignedStaff",
			"name role email"
		);
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
// router.put("/:id/status", authorizeUser("staff"), async (req, res) => {
router.put("/:id/status", authorizeUser(["admin"]), async (req, res) => {
	try {
		const { status } = req.body;

		// Validate status change
		const validStatuses = [
			"pending",
			"assigned",
			"packed",
			"shipped",
			"delivered",
			"canceled",
		];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({ message: "Invalid order status" });
		}

		const order = await Order.findOne({ orderId: req.params.id });
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		// Update the order status
		order.status = status;
		await order.save();
		console.log("curr user:", req.user);
		// Create an audit log for updating order status
		await createLog(
			"update",
			"Order",
			order._id,
			req.user.userId,
			`Updated status of order ${req.params.id} to ${status}`
		);

		res.status(200).json({
			message: `Order status updated to ${status}`,
			order,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// // Update the status of an order (PUT /orders/:id)
// router.put("/:id", authorizeUser("staff"), async (req, res) => {
// 	try {
// 		const { status } = req.body;

// 		// Validate status change
// 		if (
// 			!["pending", "assigned", "shipped", "delivered"].includes(status)
// 		) {
// 			return res.status(400).json({ message: "Invalid order status" });
// 		}

// 		const updatedOrder = await Order.findOneAndUpdate(
// 			{ orderId: req.params.id },
// 			{ status },
// 			{ new: true }
// 		);

// 		if (!updatedOrder) {
// 			return res.status(404).json({ message: "Order not found" });
// 		}

// 		// Create an audit log for updating order status
// 		await createLog(
// 			"update",
// 			updatedOrder._id,
// 			req.user.userId,
// 			`Updated status of order ID: ${req.params.id} to ${status}`
// 		);

// 		res.status(200).json({
// 			message: "Order status updated",
// 			order: updatedOrder,
// 		});
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({
// 			message: "Internal Server Error",
// 			error: err.message,
// 		});
// 	}
// });

// Delete an order (DELETE /orders/:id)
router.delete("/:id", authorizeUser(["admin"]), async (req, res) => {
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
			"Order",
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
