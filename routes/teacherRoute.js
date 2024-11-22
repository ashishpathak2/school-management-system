var express = require('express');
var router = express.Router();
const { getAllTeachers, addTeacher, getTeacherById, updateTeacherById, deleteTeacherById } = require("../src/controllers/teacherController");
const { upload } = require('../src/config/multer');
const {isAuthenticated} = require("../src/middlewares/isAuthenticated")


router.get("/allteacher/:page", getAllTeachers);              //get all teachers with pagination
router.get("/getteacherbyid/:id", getTeacherById);            //get a teacher detail by id
router.put("/updateteacherbyid/:id",isAuthenticated ,upload.single('file') ,updateTeacherById);      //update a teacher
router.delete("/deleteteacherbyid/:id", isAuthenticated ,deleteTeacherById);   // soft-delete a teachers
router.post("/addteacher",isAuthenticated ,upload.single('file'), addTeacher); //add a teachers


module.exports = router;
