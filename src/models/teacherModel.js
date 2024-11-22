const mongoose = require('mongoose');

// Define the schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
}, { 
  timestamps: true // Pass timestamps as an option here
});

// Export the model
module.exports = mongoose.model('teachers', teacherSchema);
