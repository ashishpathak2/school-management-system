const classes = require("../models/classModel");
const mongoose = require("mongoose");
const teachers = require("../models/teacherModel"); 

// get all classes
async function getAllClasses(req, res) {
  try {
    // Fetch all classes from the database
    const allClasses = await classes.find({});

    // Respond with the list of all classes
    res.status(200).json({
      total: allClasses.length,
      classes: allClasses,
    });
  } catch (error) {
    console.error("Error retrieving classes:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// get a class by ID
async function getClassesById(req, res) {
  try {
    const classId = req.params.id;

    // Validate classId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).send("Invalid Class Id");
    }

    // Fetch class by Id from the database
    const classDetail = await classes.findById(classId);

    if (!classDetail) {
      return res.status(404).send("Class not found");
    }

    // Respond with the class details
    res.status(200).json({ Class: classDetail });
  } catch (error) {
    console.error("Error retrieving class:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// update class by ID
async function updateClassById(req, res) {
  try {
    const { id } = req.params; // Extract class ID from params
    const { name, teacherId } = req.body; // Extract fields to update

    // Validate classId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid Class ID");
    }

    // Validate that at least one field to update is provided
    if (!(name || teacherId)) {
      return res.status(400).send("No fields provided for update");
    }

    // Find and update the class
    const updatedClass = await classes.findByIdAndUpdate(
      id,
      { $set: { name, teacherId } }, // Update only provided fields
      { new: true } // Return the updated document
    );

    if (!updatedClass) {
      return res.status(404).send("Class not found");
    }

    // Respond with updated class
    res.status(200).json({ UpdatedClass: updatedClass });
  } catch (error) {
    console.error("Error updating class:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// delete class by ID
async function deleteClassById(req, res) {
  try {
    const { id } = req.params; // Extract class ID from params

    // Validate classId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid class ID");
    }

    // Find and delete the class by ID
    const deletedClass = await classes.findByIdAndDelete(id);

    // Handle case when class is not found
    if (!deletedClass) {
      return res.status(404).send("Class not found");
    }

    // Respond with success message and the deleted class details
    res.status(200).json({
      message: "Class deleted successfully",
      class: deletedClass,
    });
  } catch (error) {
    console.error("Error deleting class:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Add a new class
async function addClass(req, res) {
  try {
    const { name, teacherId, studentCount} = req.body;

    // Validate required fields
    if (!name || !teacherId) {
      return res.status(400).json({ message: "Name and teacherId are required." });
    }

    // Find teacher by teacherId (ensure teacher exists)
    const teacher = await teachers.findById(teacherId);

    // Check if the teacher exists
    if (!teacher) {
      return res.status(404).json({ message: `Teacher with Id ${teacherId} not found.` });
    }

    // Create a new class document
    const newClass = new classes({
      name,
      teacherId, // Assign the teacherId to the class
      studentCount: studentCount || 0, // Optionally initialize with 0 students
    });

    // Save the new class to the database
    const savedClass = await newClass.save();

    // Respond with success message and the saved class
    res.status(201).json({
      message: "Class added successfully",
      class: savedClass, // Return saved class object
    });
  } catch (error) {
    console.error("Error adding class:", error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}


module.exports = { addClass, getAllClasses, getClassesById, updateClassById, deleteClassById };