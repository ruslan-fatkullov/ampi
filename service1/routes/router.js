const express = require("express");

const router = express.Router()

const controller = require("../controller/controller");

router.get("/getAllFiles", controller.GetAllFiles)

module.exports = router;