const Teacher = require("../models/teacherModel");
const mongoose = require("mongoose");
const { profileImageUpload } = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;
const { extractPublicId } = require("../utils/publicIdExtractor")


// get all teachers with pagination
async function getAllTeachers(req, res) {
  try {
    const { page } = req.params;

    // Convert the page parameter to an integer
    const pageNum = parseInt(page) || 1;

    // Fixed limit of 10 teachers per page
    const limit = 10;

    // Fetch teachers with filtering and pagination
    const allTeachers = await Teacher
      .find({ isDeleted: false }) // Only fetch teachers that are not soft-deleted
      .skip((pageNum - 1) * limit)
      .limit(limit)

    // Count total teachers
    const total = await Teacher.countDocuments({ isDeleted: false });

    // Respond with the retrieved data
    res.status(200).json({
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limit),
      teachers: allTeachers,
    });
  } catch (error) {
    console.error("Error retrieving teachers:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}


// get a teacher by their ID
async function getTeacherById(req, res) {
  try {
    const teacherId = req.params.id;

    // Validate teacherId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).send("Invalid Teacher Id");
    }

    // Fetch teacher by ID from the database
    const teacherDetail = await Teacher.findById(teacherId);

    // Respond with the teacher details
    if (!teacherDetail) {
      return res.status(404).send("Teacher not found");
    }

    res.status(200).json({ teacher: teacherDetail });
  } catch (error) {
    console.error("Error retrieving teacher:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}


// update a teacher details by ID
async function updateTeacherById(req, res) {
  try {
    const { id } = req.params; // Extract Teacher ID from params
    const { name, subject, email } = req.body; // Extract fields to update

    // Validate teacherId and ensure at least one field is provided
    if (!mongoose.Types.ObjectId.isValid(id)) { 
      return res.status(400).send("Invalid Teacher ID"); 
    }

    if (!(name || subject || email || req.file)) { 
      return res.status(400).send("No fields provided for update"); 
    }

    // Fetch existing Teacher details
    const teacherDetailbyId = await Teacher.findById(id);

    if (!teacherDetailbyId) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Delete the existing image in Cloudinary (if profileImageUrl exists and a new image is provided)
    if (teacherDetailbyId.profileImageUrl && req.file) {
      const publicId = extractPublicId(teacherDetailbyId.profileImageUrl); // extractPublicId function required from Utils
      await cloudinary.uploader.destroy(publicId);      
    }

    // Upload new profile image if provided
    let profileImageUrl = teacherDetailbyId.profileImageUrl; // Retain the existing URL by default
    if (req.file) {
      profileImageUrl = await profileImageUpload(req); // profileImageUpload function required from config
    }

    // Find and update the teacher
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: { name, subject, email, profileImageUrl } }, // Update only provided fields
      { new: true } // Return the updated document
    );


    // Respond with the updated teacher details
    res.status(200).json({ message: "Teacher updated successfully", teacher: updatedTeacher });
  } catch (error) {
    console.error("Error updating teacher:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}



// soft-delete a teacher by ID
async function deleteTeacherById(req, res) {
  try {
    const { id } = req.params; // Extract teacher ID from params

    // Validate teacherId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid teacher ID");
    }

    // Soft delete the teacher by updating the `isDeleted` field to true
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true } }, // Soft delete
      { new: true } // Return the updated document
    );

    if (!updatedTeacher) {
      return res.status(404).send("Teacher not found");
    }

    res.status(200).json({
      message: "Teacher soft-deleted successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("Error soft-deleting teacher:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}


async function addTeacher(req, res) {
  try {
    const { name, email, subject } = req.body;

    // Validate required fields
    if (!name || !email || !subject) { return res.status(400).json({ message: "Name, email, and subject are required." }); }

    // Check if teacher already exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) { return res.status(409).json({ message: "Teacher with this email already exists." }); }

    // Upload profile image
    const profileImageUrl = await profileImageUpload(req);

    // Save teacher details
    const newTeacher = new Teacher({
      name,
      email,
      subject,
      profileImageUrl,
    });
    await newTeacher.save();

    res.status(201).json({
      message: "Teacher added successfully",
      teacher: newTeacher,
    });
  } catch (error) {
    console.error("Error adding teacher:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}



module.exports = {
  addTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
};
