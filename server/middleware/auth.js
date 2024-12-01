const jwt = require("jsonwebtoken");

// Middleware to authenticate the user via JWT token
const authorizeUser = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // Add user data to request object
		next();
	} catch (err) {
		res.status(400).json({ message: "Invalid token" });
	}
};

module.exports = authorizeUser;
