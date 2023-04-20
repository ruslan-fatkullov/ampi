const express = require("express");

const router = express.Router()

const controller = require("../controller/authController");

router.post("/login", controller.loginUser)
router.post("/signup", controller.registerUser)


module.exports = router;