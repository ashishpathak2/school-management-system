const mongoose = require('mongoose');

// Define the schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
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
module.exports = mongoose.model('students', studentSchema);
