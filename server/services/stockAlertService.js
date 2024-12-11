const StockAlert = require("../models/StockAlert");

const GLOBAL_THRESHOLD = 5; // or 10 as needed

// Service to check and create low-stock alerts
const checkLowStock = async (item) => {
	console.log("run check low stock function");
	try {
		if (item.quantity < GLOBAL_THRESHOLD) {
			// Check if an active alert already exists
			// const existingAlert = await StockAlert.findOne({
			// 	itemId: item._id,
			// 	status: "active",
			// });

			// if (!existingAlert) {
			// Create a new alert
			const alert = new StockAlert({
				alertId: `alert-${Date.now()}`,
				itemId: item._id,
				threshold: GLOBAL_THRESHOLD,
				alertDate: new Date(),
				status: "active",
			});
			await alert.save();
			console.log(`Low stock alert created for item: ${item.name}`);
			// }
		}
	} catch (err) {
		console.error("Error creating low stock alert:", err);
	}
};

module.exports = { checkLowStock };
