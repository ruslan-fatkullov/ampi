const express = require("express");
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(fileUpload({}))
app.use(bodyParser.urlencoded({ extended: true }));

const Routes = require("./routes/router");

app.use("/report", Routes);


app.listen(3004, ()=>{
    console.log("Сервер запущен на порту 3004")
});

const db = require("./models");
db.sequelize.sync();

