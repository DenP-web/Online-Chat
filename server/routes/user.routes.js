const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const router = express.Router();

const userController = require('../controllers/user.controller')


router.get('/', protectRoute, userController.getUserForSidebar)




module.exports = router;
