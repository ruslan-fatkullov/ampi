const express = require("express");

const router = express.Router()

const controller = require("../controller/service4controller");

router.post("/createReport", controller.addReport)
router.get("/getReportByAuthor", controller.selectReportsByAuthor)
router.get("/getReportByFile", controller.selectReportsByFile)


module.exports = router;