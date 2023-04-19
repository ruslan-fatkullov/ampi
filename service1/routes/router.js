const express = require("express");

const router = express.Router()

const controller = require("../controller/controller");

router.get("/getAllFiles", controller.GetAllFiles)
router.post("/downloadFile", controller.DownLoadFile)

module.exports = router;