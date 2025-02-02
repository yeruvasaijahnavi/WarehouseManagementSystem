const express = require("express");
const Inventory = require("../models/Inventory");
const { checkLowStock } = require("../services/stockAlertService");
const { createLog } = require("../services/logService");
const authorizeUser = require("../middleware/auth");
const router = express.Router();

// Get detailed COGS and inventory value reports
router.get("/report", async (req, res) => {
	try {
		const items = await Inventory.find();
		const detailedReport = items.map((item) => ({
			itemName: item.name,
			stockLevel: item.quantity,
			unitPrice: item.price,
			totalValue: item.quantity * item.price,
		}));

		const totalValue = detailedReport.reduce(
			(sum, item) => sum + item.totalValue,
			0
		);

		res.status(200).json({ totalValue, detailedReport });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});
// Create a new inventory item (POST /inventory)
router.post("/", authorizeUser(["admin"]), async (req, res) => {
	try {
		const { sku, name, category, description, quantity, price, location } =
			req.body;

		// Check if the item already exists by SKU or ItemId
		const existingItem = await Inventory.findOne({ sku });
		if (existingItem) {
			return res
				.status(400)
				.json({ message: "Item with this SKU already exists" });
		}

		const newItem = new Inventory({
			sku,
			name,
			category,
			description,
			quantity,
			price,
			location,
		});

		await newItem.save();
		// Create an audit log for the new item
		await createLog(
			"add",
			"Inventory",
			newItem._id,
			req.user.userId,
			`Added new item: ${name}`
		);

		res.status(201).json({
			message: `Item "${name}" created successfully`,
			item: newItem,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Get all inventory items (GET /inventory)
router.get("/", async (req, res) => {
	try {
		const items = await Inventory.find();

		res.status(200).json(items);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Get an inventory item by its ID (GET /inventory/:sku)
router.get("/:sku", async (req, res) => {
	try {
		const item = await Inventory.findOne({ sku: req.params.sku });
		if (!item) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.status(200).json(item);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Update an inventory item (PUT /inventory/:sku)
router.put("/:sku", authorizeUser(["admin"]), async (req, res) => {
	try {
		const { name, category, description, quantity, price, location } =
			req.body;

		const updatedItem = await Inventory.findOneAndUpdate(
			{ sku: req.params.sku },
			{ name, category, description, quantity, price, location },
			{ new: true }
		);

		if (!updatedItem) {
			return res.status(404).json({ message: "Item not found" });
		}
		console.log("Updated inventory item:", updatedItem); // Debugging log
		await checkLowStock(updatedItem);
		// Create an audit log for updating an item
		await createLog(
			"update",
			"Inventory",
			updatedItem._id,
			req.user.userId,
			`Updated item with SKU: ${req.params.sku}`
		);
		res.status(200).json({
			message: "Item updated successfully",
			item: updatedItem,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

// Delete an inventory item (DELETE /inventory/:sku)
router.delete("/:sku", authorizeUser(["admin"]), async (req, res) => {
	try {
		const deletedItem = await Inventory.findOneAndDelete({
			sku: req.params.sku,
		});
		if (!deletedItem) {
			return res.status(404).json({ message: "Item not found" });
		}
		// Create an audit log for deleting an item
		await createLog(
			"delete",
			"Inventory",
			deletedItem._id,
			req.user.userId,
			`Deleted item with SKU: ${req.params.sku}`
		);
		res.status(200).json({ message: "Item deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
			error: err.message,
		});
	}
});

module.exports = router;
