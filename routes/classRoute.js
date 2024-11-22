var express = require('express');
var router = express.Router();
const { 
  addClass, 
  getAllClasses, 
  getClassesById, 
  updateClassById, 
  deleteClassById 
} = require("../src/controllers/classController");
const {isAuthenticated} = require("../src/middlewares/isAuthenticated")


router.get("/allclass", getAllClasses);                  // get all classes
router.get("/getclassbyid/:id", getClassesById);         // get class by ID
router.put("/updateclassbyid/:id", isAuthenticated ,updateClassById);     // update class by ID
router.delete("/deleteclassbyid/:id", isAuthenticated ,deleteClassById);  // delete class by ID
router.post("/addclass", isAuthenticated ,addClass);                      // add a new class 


module.exports = router;
