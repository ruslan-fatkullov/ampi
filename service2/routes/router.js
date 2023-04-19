const express = require("express");

const router = express.Router()

const controller = require("../controller/service2controller");

router.post("/uploadFile", controller.uploadFiles)


module.exports = router;