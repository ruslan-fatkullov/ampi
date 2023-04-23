const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.static(__dirname));


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


app.listen(3001, ()=>{
    console.log("Сервер запущен на порту 3001")
});

const db = require("./models");
db.sequelize.sync();

