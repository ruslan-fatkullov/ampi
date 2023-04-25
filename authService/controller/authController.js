const db = require("../models")
const User = db.user
const jwt = require("jsonwebtoken")
const secret = require("../config/jwtSecret")

exports.loginUser = (req, res) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    }).then((result) => {
        if (!result) {
            res.json({ status: 400, message: "Пользователя с таким логином не существует" })
            return
        }
        if (result.password !== req.body.password) {
            res.json({ status: 400, message: "Неверный пароль" })
            return
        }
        res.json({ status: 200, message: "Авторизация прошла успешно", token: result.token })
    })
}


exports.registerUser = (req, res) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    }).then((result) => {
        if (result) {
            res.json({ status: 400, message: "Пользователь с таким логином уже существует" })
            return
        }

        const data = {
            login: req.body.login
        }
        const token = jwt.sign({ data, }, secret.SIGNATURE, { expiresIn: secret.EXPIRATION });

        User.create({
            login: req.body.login,
            password: req.body.password,
            token: token
        }).then(() => {
            res.json({ status: 200, message: "Пользователь создан", token: token })
        }).catch(() => {
            res.json({ status: 400, message: "Не удалось создать пользователя" })
        })
    })
}

exports.changeUserName = (req, res) => {
    const data = {
        login: req.body.newLogin
    }
    const token = jwt.sign({ data, }, secret.SIGNATURE, { expiresIn: secret.EXPIRATION });

    User.update(
        {
        login: req.body.newLogin,
        token: token
        },
        {
            where: {
                token: req.body.token
            }
        }).then(()=>{
            res.json({message: "Пользователь обновлен", token: token})
        })
}