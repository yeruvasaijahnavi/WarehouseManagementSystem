const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Create a new order (POST /orders)
router.post("/", async (req, res) => {
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
		res.status(201).json({
			message: "Order created successfully",
			order: newOrder,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Get all orders (GET /orders)
router.get("/", async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
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
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Update the status of an order (PUT /orders/:id)
router.put("/:id", async (req, res) => {
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

		res.status(200).json({
			message: "Order status updated",
			order: updatedOrder,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Delete an order (DELETE /orders/:id)
router.delete("/:id", async (req, res) => {
	try {
		const deletedOrder = await Order.findOneAndDelete({
			orderId: req.params.id,
		});
		if (!deletedOrder) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.status(200).json({ message: "Order deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
