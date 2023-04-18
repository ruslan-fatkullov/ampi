const db = require("../models")
const File = db.file
exports.CreateNewFile = (req, res) => {
    File.create({
        name: req.body.name,
        author: req.body.author,
        conuntOfDownload: "0",
        linkToFile: req.body.linkToFile
    }).then(function () {
        res.json("Файл создан")
    }).catch(err => {
        console.log("Ошибка в создании файла" + err)
    })
}

exports.DeleteFile = (req, res) => {

}