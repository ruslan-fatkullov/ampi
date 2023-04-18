const db = require("../models")
const File = db.file
exports.GetAllFiles = (req, res) => {
    File.findAll().then(function (AllFiles) {
        res.json({ files: AllFiles })
    }).catch(err => {
        console.log("Ошибка в получении файлов" + err)
    })
}
/*
app.get('/download', function(req, res){
  const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
  res.download(file); // Set disposition and send it.
});*/