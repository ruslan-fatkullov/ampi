const db = require("../models")
const Report = db.report
const File = db.file
const fs_config = require("../../file_storage_config")


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
            author: req.body.author
        }
    }).then((result)=>{
        res.json({reports: result})
    })
}

exports.selectReportsByFile = (req, res) => {
    Report.findAll({
        where:{
            file: req.body.name
        }
    }).then((result)=>{
        res.json({reports: result})
    })
}

exports.selectFilesByAuthor = (req, res) => {
    File.findAll({
        where:{
            author: req.body.author
        }
    }).then((result)=>{
        res.json({reports: result})
    })
}