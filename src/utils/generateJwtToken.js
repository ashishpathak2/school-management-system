const jwt = require("jsonwebtoken")

// Function to generate JWT token
function generateToken(admin) {
    return jwt.sign(
      { email: admin.email, id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );
  }


// Function to verify JWT token
function verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null; // Return null if token verification fails
    }
  }


  
module.exports={
    generateToken,verifyToken
}