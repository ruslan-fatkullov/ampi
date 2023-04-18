const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.static(__dirname));
app.use(multer({ dest: "uploads" }).single("filedata"));


const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Routes = require("./routes/router");

app.use("/files", Routes);
app.get("/getHello", function (req, res) {
    res.send("HELLO")
})


app.listen(3002, ()=>{
    console.log("Сервер запущен на порту 3002")
});

const db = require("./models");
db.sequelize.sync();



/*const express = require("express");
const multer  = require("multer");
  
const app = express();
  
app.use(express.static(__dirname));
app.use(multer({dest:"uploads"}).single("filedata"));
app.get("getHello", function(req, res){
    res.send("HELLO")
})
app.post("/service1/upload", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3001);*/