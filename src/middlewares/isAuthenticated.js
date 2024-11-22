const { verifyToken } = require("../utils/generateJwtToken")

// Middleware to check if user is authenticated
 async function isAuthenticated(req, res, next) {
    try {
      if (req.cookies && req.cookies.AuthToken) {
        const tokenData = verifyToken(req.cookies.AuthToken); // Verify token
        if (tokenData) return next();
      }
  
      return res.status(401).json({ message: "Please login." });
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(500).json({ message: "An error occurred during authentication." });
    }
  }

module.exports = {
    isAuthenticated
}
