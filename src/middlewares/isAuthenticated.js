const { verifyToken } = require("../utils/generateJwtToken");

// Middleware to check if the user is authenticated
async function isAuthenticated(req, res, next) {
  try {
    // Check if AuthToken exists in cookies
    if (req.cookies && req.cookies.AuthToken) {
      // Verify token
      const tokenData = verifyToken(req.cookies.AuthToken); 
      
      if (tokenData) {
        return next();  // Token is valid, proceed to the next middleware
      }
    }

    // If no token or invalid token, send Unauthorized response
    return res.status(401).json({ message: "Please login." });

  } catch (error) {
    console.error("Authentication error:", error);
    // Handle any errors that occur during the token verification process
    return res.status(500).json({ message: "An error occurred during authentication." });
  }
}

module.exports = {
  isAuthenticated
};
