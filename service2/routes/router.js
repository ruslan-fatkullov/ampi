const express = require("express");

const router = express.Router()

const controller = require("../controller/controller");

router.post("/createFile", controller.CreateNewFile)

router.post("/deleteFile", controller.CreateNewFile)

module.exports = router;