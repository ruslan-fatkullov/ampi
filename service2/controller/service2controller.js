const db = require("../models")
const File = db.file
const fs_config = require("../config/fileStorageConfig")

const fs = require('file-system')

exports.uploadFiles = (req, res) => {
    try {
        const file = req.files.file
        console.log(file.name)
        if (file.size > 1048576) {
            res.json({ message: "Файл больше 1мб" })
            return
        }
        /*fs.access(fs_config.FILE_STORAGE_DIRECTORY + file.name, fs.constants.F_OK, () => {
            res.json({ message: "Такой файл уже существует" })
            return
        })*/
        File.create({
            name: file.name,
            author: req.body.author,
            conuntOfDownload: 0,
            linkToFile: fs_config.FILE_STORAGE_DIRECTORY + file.name
        }).then(() => {
            file.mv(fs_config.FILE_STORAGE_DIRECTORY + file.name)
            res.json({ message: "Файл добавлен" })
        })
    } catch (e) {
        console.log(e)
    }
}