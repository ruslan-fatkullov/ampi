const db = require("../models")
const Report = db.report
const fs_config = require("../config/fileStorageConfig")


exports.addReport = (req, res) => {
    Report.create({
        file: req.body.file,
        author: req.body.author,
        userDownload: req.body.user,
        date: Date.now()
    }).then(()=>{
        res.json({message: "Отчет создан"})
    })
}

exports.selectReportsByAuthor = (req, res) => {
    Report.findAll({
        where:{
            author: req.query.author
        }
    }).then((result)=>{
        res.json({reports: result})
    })
}

exports.selectReportsByFile = (req, res) => {
    Report.findAll({
        where:{
            file: req.query.file
        }
    }).then((result)=>{
        res.json({reports: result})
    })
}