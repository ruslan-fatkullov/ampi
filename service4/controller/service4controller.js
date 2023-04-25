const db = require("../models")
const Report = db.report
const File = db.file
const fs_config = require("../../file_storage_config")

const { Op } = require('sequelize');

exports.GetAllFiles = (req, res) => {
    File.findAll().then(function (AllFiles) {
        res.json({ files: AllFiles })
    }).catch(err => {
        console.log("Ошибка в получении файлов" + err)
    })
}

exports.addReport = (req, res) => {
    Report.create({
        file: req.body.file,
        author: req.body.author,
        userDownload: req.body.user,
        date: Date.now()
    }).then(() => {
        res.json({ message: "Отчет создан" })
    })
}

exports.selectReportsByAuthor = (req, res) => {
    Report.findAll({
        where: {
            author: req.body.author
        }
    }).then((result) => {
        res.json({ reports: result })
    })
}

exports.selectReportsByFile = (req, res) => {
    Report.findAll({
        where: {
            file: req.body.name
        }
    }).then((result) => {
        res.json({ reports: result })
    })
}

exports.selectFilesByAuthor = (req, res) => {
    File.findAll({
        where: {
            author: req.body.author
        }
    }).then((result) => {
        res.json({ reports: result })
    })
}


exports.searchFile = (req, res) => {
    File.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: '%' + req.body.search + '%' } },
                { author: { [Op.like]: '%' + req.body.search + '%' } }
            ]
        }
    }).then((result) => {
        res.json({ files: result })
    })
}