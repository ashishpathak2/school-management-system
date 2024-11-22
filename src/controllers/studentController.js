const mongoose = require("mongoose");
const Student = require("../models/studentModel");
const { profileImageUpload } = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;
const { extractPublicId } = require("../utils/publicIdExtractor")


async function getAllStudents(req, res) {
  try {
    const { classId, page } = req.params; // Destructure params

    // Parse the page number from the request parameters, defaulting to 1 if invalid
    const pageNum = parseInt(page, 10) || 1; 
    const limit = 10; // Set a fixed limit of 10 students per page

    // If page number is less than or equal to 0, return an error
    if (pageNum <= 0) {
      return res.status(400).json({ message: "Invalid page number" });
    }

    // Initialize the filter query
    let filter = { isDeleted: false };

    // If classId is provided and is not "all", add it to the filter query
    if (classId && classId !== "all") {
      // Validate the classId as an ObjectId
      if (!classId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid classId format" });
      }
      filter.classId = classId; 
    }

    // Fetch students with filtering, pagination, and class population
    const students = await Student.find(filter)
      .populate("classId", "name") // Populate the class name
      .skip((pageNum - 1) * limit) // Skip the records for the current page
      .limit(limit); // Limit the results to the specified page size

    // Count total documents for pagination
    const total = await Student.countDocuments(filter);

    // Respond with the students data, total records, and pagination info
    res.status(200).json({
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limit), // Calculate total pages
      students,
    });
  } catch (error) {
    console.error("Error retrieving students:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}



// get a student by their ID
async function getStudentById(req, res) {
  try {
    const { id } = req.params;

    // Validate the student ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const studentDetail = await Student.findById(id); // Find the student by ID

    // If student not found, return an error
    if (!studentDetail) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Respond with the student's details
    res.status(200).json(studentDetail);
  } catch (error) {
    console.error("Error retrieving student:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// update student details by ID
async function updateStudentById(req, res) {
  try {
    const { id } = req.params;
    const { name, email, classId } = req.body; // Extract updated fields from the request body

    // Validate the student ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Check if all fields (name, email, classId) and file are empty or undefined
    if (!(name || email || classId || req.file)) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    

    // Fetch existing student details
    const studentDetailbyId = await Student.findById(id);

    if (!studentDetailbyId) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete the existing image in Cloudinary (if profileImageUrl exists)
    if (studentDetailbyId.profileImageUrl  && req.file) {
      const publicId = extractPublicId(studentDetailbyId.profileImageUrl); //extractPublicId function required at the top from Utils
      await cloudinary.uploader.destroy(publicId);      
    }

    // Upload new profile image if provided
    let profileImageUrl = studentDetailbyId.profileImageUrl; // Retain the existing URL by default
    if (req.file) {
      profileImageUrl = await profileImageUpload(req); // profileImageUpload funtion required at the top from config
    }

    // Find and update the student with the provided fields
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: { name, email, classId, profileImageUrl } },
      { new: true }
    );


    // Respond with the updated student details
    res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}



// soft-delete a student by ID
async function deleteStudentById(req, res) {
  try {
    const { id } = req.params;

    // Validate the student ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Soft-delete the student by setting the `isDeleted` field to true
    const updatedStudent = await Student.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });

    // If the student is not found, return an error
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Respond with success message and the updated student
    res.status(200).json({ message: "Student soft-deleted successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error soft-deleting student:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Add a new student
  async function addStudent (req,res) {
  try {
    const { name, email, classId } = req.body;

    // Validate required fields
    if (!name || !email || !classId) {
      return res.status(400).json({ message: "Name, email, and classId are required." });
    }

    // Check if a student with the same email already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: "Student with this email already exists." });
    }

    // Optional: Upload profile image (only if a file is present)
    let profileImageUrl = '';
    if (req.file) {
      profileImageUrl = await profileImageUpload(req);
    }

    // Create and save a new student
    const newStudent = new Student({
      name,
      email,
      classId, 
      profileImageUrl, // Optional profile image URL (if provided)
    });

    const savedStudent = await newStudent.save();

    // Respond with success message and the saved student
    res.status(201).json({
      message: "Student added successfully.",
      student: savedStudent
    });
  } catch (error) {
    console.error("Error adding student:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};



module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById
};