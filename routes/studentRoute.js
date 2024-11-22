var express = require('express');
var router = express.Router();
const { upload } = require('../src/config/multer');
const {isAuthenticated} = require("../src/middlewares/isAuthenticated")


const { 
  getAllStudents, 
  addStudent,   
  getStudentById, 
  updateStudentById, 
  deleteStudentById 
} = require("../src/controllers/studentController");


router.get("/allstudent/:classId/:page", getAllStudents); // Get all students filtered by className with pagination
router.get("/getstudentbyid/:id", getStudentById); //get a student detail by id
router.put("/updatestudentbyid/:id",isAuthenticated,upload.single('file') ,updateStudentById); //update a student
router.delete("/deletestudentbyid/:id",isAuthenticated ,deleteStudentById); // soft-delete a student 
router.post("/addstudent", isAuthenticated ,upload.single('file') ,addStudent); //add a student 

module.exports = router;
