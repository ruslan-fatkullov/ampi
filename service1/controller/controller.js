const db = require("../models")
const File = db.file
const fs_config = require("../../file_storage_config")
const axios = require('axios')
const service_config = require("../../client/src/config/config")

exports.GetAllFiles = (req, res) => {
    File.findAll().then(function (AllFiles) {
        res.json({ files: AllFiles })
    }).catch(err => {
        console.log("Ошибка в получении файлов" + err)
    })
}

/*exports.DownLoadFile = (req, res) => {
    File.findOne(
        { where: { name: req.body.name } }
    ).then((result) => {
        File.update(
            { conuntOfDownload: result.conuntOfDownload+1 },
            { where: { name: req.body.name } }
        ).then(() => {


            const file = fs_config.FILE_STORAGE_DIRECTORY + req.body.name
            res.download(file, req.body.name)
        })
    })
}*/


exports.DownLoadFile = (req, res) => {
    File.findOne(
        { where: { name: req.body.name } }
    ).then((result) => {
        File.update(
            { conuntOfDownload: result.conuntOfDownload+1 },
            { where: { name: req.body.name } }
        )
        return result
    }).then((rez)=>{
        axios.post(service_config.SERVICE_4 + "/report/createReport", {
            file: req.body.name,
            author: rez.author,
            user: req.body.userDownload
        }).then(r  =>{
            const file = fs_config.FILE_STORAGE_DIRECTORY + req.body.name
            res.status(200).download(file, req.body.name)
        }).catch(()=>{
            return res.status(400).json({message: "Не удалось скачать файл"})
        })
    })
}
