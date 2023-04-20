const db = require("../models")
const File = db.file
const fs_config = require("../config/fileStorageConfig")
exports.GetAllFiles = (req, res) => {
    File.findAll().then(function (AllFiles) {
        res.json({ files: AllFiles })
    }).catch(err => {
        console.log("Ошибка в получении файлов" + err)
    })
}

exports.DownLoadFile = (req, res) => {
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
}
