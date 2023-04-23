const db = require("../models")
const File = db.file
const fs_config = require("../../file_storage_config")

const fs = require('fs')

exports.uploadFiles = (req, res) => {
    try {
        const file = req.files.file
        console.log(file.name)
        if (file.size > 1048576) {
            res.json({status: 400, message: "Файл больше 1мб"})
            return
        }
        if (fs.existsSync(fs_config.FILE_STORAGE_DIRECTORY+file.name)){
            return res.json({status: 400, message:"Такой файл уже существует"})
        }
        File.create({
            name: file.name,
            author: req.body.author,
            conuntOfDownload: 0,
            linkToFile: fs_config.FILE_STORAGE_DIRECTORY + file.name
        }).then(() => {
            file.mv(fs_config.FILE_STORAGE_DIRECTORY + file.name).then(() => {
                res.json({status: 200, message: "Файл добавлен"})
            })
        })
    } catch (e) {
        console.log(e)
    }
}