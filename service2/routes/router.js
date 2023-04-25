const express = require("express");

const router = express.Router()

const controller = require("../controller/service2controller");

router.post("/uploadFile", controller.uploadFiles)
router.post("/deleteFile", controller.deleteFile)


module.exports = router;