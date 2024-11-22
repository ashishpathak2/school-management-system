const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


// Export the connection
module.exports = mongoose.connection;
