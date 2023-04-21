<template>
    <div class="overlay">
        <div class="login-wrapper">
            <div class="login-content">
                <a class="close" @click="$emit('loginMode')">
                    Закрыть
                </a>
                <h3>{{ changeModeHeaderText }}</h3>
                <form @submit.prevent="loginMode ? login() : register()">
                    <label for="login">
                        Логин пользователя:
                        <input v-model="userLogin" type="text" placeholder="Введите логин" />
                    </label>
                    <label for="password">
                        Пароль:
                        <input v-model="userPassword" type="password" placeholder="Введите пароль" />
                    </label>

                    <label v-if="!loginMode" for="password">
                        Повторите пароль:
                        <input v-model="userPasswordConfirm" type="password" name="password" id="password"
                            placeholder="Введите пароль" />
                    </label>

                    <p>{{ authResult }}</p>

                    <button class="btn" v-if="loginMode" type="submit">Войти</button>
                    <button class="btn" v-else type="submit">Зарегестрироваться</button>

                    <div class="btn btn-change" @click="changeAuthMode()">{{ changeModeButtonText }}</div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store/index"
export default {
    data() {
        return {
            userLogin: "",
            userPassword: "",
            userPasswordConfirm: "",
            loginMode: true,
            changeModeButtonText: "Регистрация",
            changeModeHeaderText: "Авторизация",
            authResult: "",
        }
    },
    methods: {
        changeAuthMode() {
            this.loginMode = !this.loginMode
            if (this.loginMode) {
                this.changeModeButtonText = "Регистрация"
                this.changeModeHeaderText = "Авторизация"
                return
            }
            this.changeModeButtonText = "Авторизация"
            this.changeModeHeaderText = "Регистрация"
        },
        login() {
            console.log("Авторизация...")
            store.dispatch("loginUser", { login: this.userLogin, password: this.userPassword }).then(() => {
                this.authResult = store.getters.getAuthMessage
                if (store.getters.getAuthSuccess === "success") {
                    this.$emit('loginMode')
                    
                    store.dispatch("setLogin", true)
                }
            })
        },
        register() {
            console.log("Регистрация...")
            store.dispatch("registerUser", { login: this.userLogin, password: this.userPassword, passwordConfirm: this.userPasswordConfirm }).then(() => {
                this.authResult = store.getters.getAuthMessage
            })
        }
    }

    // паттерн логина pattern="^[a-zA-Z][a-zA-Z0-9-_.]{8,20}$" required="required" 
    // паттерн пароля pattern="(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" 
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    outline: none;
    padding: 0;
}

*:after,
*:before {
    box-sizing: border-box;
}

/*
*    Общие стили
*/
html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
}

body {
    background-color: #f3f3f3;
    color: rgb(165, 165, 165);
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
    font-weight: 400;
}

a.close {
    background-color: rgb(204, 204, 204);
    border-radius: 5px;
    color: rgb(255, 255, 255);
    display: block;
    font-family: 'Varela Round', sans-serif;
    font-size: 1.2em;
    padding: .2em .5em;
    position: absolute;
    top: 1.25rem;
    transition: all 400ms ease;
    right: 1.25rem;
    text-decoration: none;
}

a.close:hover {
    background-color: #1bc5b3;
    cursor: pointer;
}

/*
*    Панель входа
*/
div.overlay {
    background-color: rgba(0, 0, 0, .25);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
}

div.overlay>div.login-wrapper {
    align-self: center;
    background-color: rgba(0, 0, 0, .25);
    border-radius: 2px;
    padding: 6px;
    width: 450px;
}

div.overlay>div.login-wrapper>div.login-content {
    background-color: rgb(255, 255, 255);
    border-radius: 2px;
    padding: 24px;
    position: relative;
}

div.overlay>div.login-wrapper>div.login-content>h3 {
    color: rgb(0, 0, 0);
    font-family: 'Varela Round', sans-serif;
    font-size: 1.8em;
    margin: 0 0 1.25em;
    padding: 0;
}

/*
*    Форма
*/
form label {
    color: rgb(0, 0, 0);
    display: block;
    font-family: 'Varela Round', sans-serif;
    font-size: 1.25em;
    margin: .75em 0;
}

form input[type="text"],
form input[type="email"],
form input[type="number"],
form input[type="search"],
form input[type="password"],
form textarea {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(186, 186, 186);
    border-radius: 1px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
    display: block;
    font-size: .65em;
    margin: 6px 0 12px 0;
    padding: .8em .55em;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 1);
    transition: all 400ms ease;
    width: 90%;
}

form input[type="text"]:focus,
form input[type="email"]:focus,
form input[type="number"]:focus,
form input[type="search"]:focus,
form input[type="password"]:focus,
form textarea:focus,
form select:focus {
    border-color: #4195fc;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 8px #4195fc;
}

form input[type="text"]:invalid:focus,
form input[type="email"]:invalid:focus,
form input[type="number"]:invalid:focus,
form input[type="search"]:invalid:focus,
form input[type="password"]:invalid:focus,
form textarea:invalid:focus,
form select:invalid:focus {
    border-color: rgb(248, 66, 66);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 8px rgb(248, 66, 66);
}

form .btn {
    background-color: #50c1e9;
    border: 1px solid rgba(0, 0, 0, .1);
    color: rgb(255, 255, 255);
    font-family: 'Varela Round', sans-serif;
    font-size: .85em;
    padding: .55em .9em;
    transition: all 400ms ease;
    margin-left: 5px;
}

form .btn-change {
    background-color: #50e96c;
}

form .btn:hover {
    background-color: #1bc5b3;
    cursor: pointer;
}

form .btn-change:hover {
    background-color: #2ac747;
    cursor: pointer;
}
</style>