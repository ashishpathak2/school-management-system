var express = require('express');
var router = express.Router();
const {adminLogin ,adminLogout} = require("../src/controllers/adminController")

router.post("/login", adminLogin);
router.get("/logout",adminLogout)

module.exports = router;
