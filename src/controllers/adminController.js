const bcrypt = require('bcryptjs');
const Admin = require("../models/adminModel"); 
const { generateToken } = require("../utils/generateJwtToken")

// Function to initialize the first admin
const initializeAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      console.log('No admin found. Creating the first admin...');

      // Hash the default password
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const admin = new Admin({
        username: 'admin', // Default admin username
        email: 'admin@example.com', // Default admin email
        password: hashedPassword, // Hashed password
      });

      await admin.save();
      console.log('Admin created successfully!');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    } else {
      console.log('Admin already exists. Skipping admin creation.');
    }
  } catch (error) {
    console.error('Error during admin initialization:', error.message);
  }
};


// Function to handle admin login
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    // Find admin by email
    const existingAdminDetail = await Admin.findOne({ email });
    if (!existingAdminDetail) {
      return res.status(404).json({ message: "Admin does not exist." });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, existingAdminDetail.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Generate JWT token
    const jwtToken = generateToken(existingAdminDetail); // Ensure generateToken is defined and working

    // Set JWT token in cookie
    res.cookie("AuthToken", jwtToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send success response
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
}

async function adminLogout(req, res, next) {
  try {
    res.clearCookie("AuthToken", { httpOnly: true });
    res.status(200).json({ message: 'Logged out successfully' });
    
  } catch (error) {
    next(error); // Handle any unexpected errors
  }
}


module.exports = {
  initializeAdmin,adminLogin,adminLogout
};
