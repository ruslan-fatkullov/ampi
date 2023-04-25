const express = require("express");

const router = express.Router()

const controller = require("../controller/service4controller");


router.get("/getAllFiles", controller.GetAllFiles)

router.post("/createReport", controller.addReport)

router.post("/getReportByAuthor", controller.selectReportsByAuthor)
router.post("/getReportByFile", controller.selectReportsByFile)


router.post("/getFilesByAuthor", controller.selectFilesByAuthor)

router.post("/getFilesBySearch", controller.searchFile)



module.exports = router;