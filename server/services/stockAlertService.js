const StockAlert = require("../models/StockAlert");
const nodemailer = require("nodemailer");

const GLOBAL_THRESHOLD = 10;

// Email transporter setup
const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.USER_PASS,
	},
});

const sendEmail = async (recipient, subject, text) => {
	try {
		await transporter.sendMail({
			from: `"Warehouse Alerts" <${process.env.USER_EMAIL}>`,
			to: recipient,
			subject: subject,
			text: text,
		});
		console.log("Email sent successfully!");
	} catch (err) {
		console.error("Error sending email:", err);
	}
};
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
			// Send email notification
			await sendEmail(
				"yeruvasaijahnavi@gmail.com",
				"Low Stock Alert",
				`The item '${item.name}' is low in stock. Current quantity: ${item.quantity}.`
			);
		}
	} catch (err) {
		console.error("Error creating low stock alert:", err);
	}
};

module.exports = { checkLowStock };
