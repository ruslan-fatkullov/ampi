const express = require("express");

const router = express.Router()

const controller = require("../controller/service4controller");

router.post("/createReport", controller.addReport)
router.post("/getReportByAuthor", controller.selectReportsByAuthor)
router.post("/getReportByFile", controller.selectReportsByFile)


router.post("/getFilesByAuthor", controller.selectFilesByAuthor)



module.exports = router;