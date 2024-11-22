const mongoose = require('mongoose');

// Define the schema
const classesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teachers',
    // required: true,
  },
  studentCount: {
    type: Number,
    default: 0,
  },
}, { 
  timestamps: true // Pass timestamps as an option here
});

// Export the model
module.exports = mongoose.model('classes', classesSchema);
