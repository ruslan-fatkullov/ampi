import config from "@/config/config"
import axios from "axios"
import jwt_decode from "jwt-decode"

export default {
    state: {
        token: "",
        authMessage: "",
        userLogin: "",
        authSuccess: false,
        loggedIn: false,
        user: "",

    },
    actions: {
        async loginUser(context, user) {
            if (user.login === "" || user.password == "") {
                context.commit("setAuthMessage", "Заполните все поля")
                return
            }
            await axios.post(config.SERVICE_3 + "/auth/login", user).then((res) => {
                context.commit("setAuthMessage", res.data.message)
                if (res.data.status === 200) {
                    context.commit("setToken", res.data.token)
                    localStorage.setItem("token", res.data.token)
                    context.commit("setAuthSuccess", "success")
                    return
                }
                context.commit("setAuthSuccess", "-(")
            })
        },
        async registerUser(context, user) {
            if (user.login === "" || user.password == "" || user.passwordConfirm == "") {
                context.commit("setAuthMessage", "Заполните все поля")
                return
            }
            if (user.password !== user.passwordConfirm) {
                context.commit("setAuthMessage", "Пароли не совпадают")
                return
            }
            await axios.post(config.SERVICE_3 + "/auth/signup", user).then((res) => {
                context.commit("setAuthMessage", res.data.message)
            })
        },
        setTokenAction(context, token) {
            context.commit("setToken", token)
            const decoded = jwt_decode(token);
            context.commit("setUserLogin", decoded.data.login)
        },
        setLoginAction(context, value) {
            context.commit("setLogin", value)
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUserLogin(state, login) {
            state.userLogin = login
        },
        setAuthMessage(state, message) {
            state.authMessage = message
        },
        setAuthSuccess(state, message){
            state.authSuccess = message
        },
        setLogin(state, value){
            state.loggedIn = value
            if(!value){
                state.userLogin = ""
            }

        }
    },
    getters: {
        getToken: state => {
            return state.token
        },
        getAuthMessage: state => {
            return state.authMessage
        },
        getUserLogin: state => {
            return state.userLogin
        },
        getAuthSuccess: state => {
            return state.authSuccess
        },
        getLoginIn: state => {
            return state.loggedIn
        },
    }
}