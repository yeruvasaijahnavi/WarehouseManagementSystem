const jwt = require("jsonwebtoken");
const User = require("../models/User");

function authorizeUser(requiredRole) {
	return async (req, res, next) => {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			if (!token) {
				return res
					.status(401)
					.json({ message: "Authorization token required" });
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log("Decoded token:", decoded);

			const user = await User.findOne({ userId: decoded.userId });

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			if (requiredRole && user.role !== requiredRole) {
				return res.status(403).json({
					message: `Access denied. You need to be a ${requiredRole} but you are a ${user.role}`,
				});
			}

			req.user = user; // Attach user info to request object
			next();
		} catch (err) {
			console.error("Authorization error:", err);
			res.status(403).json({ message: "Invalid or expired token" });
		}
	};
}

module.exports = authorizeUser;
