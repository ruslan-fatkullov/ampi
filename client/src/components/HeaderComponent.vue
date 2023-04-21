<template>
    <div class="container">
        <div class="auth-header">
            <div class="label">
                <h3>Облачное хранилище</h3>
            </div>
            <div class="profile">
                <div v-if="!loggedIn" class="btn-login" @click="loginMode()"><span>Войти</span></div>

                <div v-if="loggedIn" class="dropdown">
                    <div class="dropdown-btn">{{ userName }} 
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </span>
                    </div>
                    <div class="dropdown-content">
                        <div class="dropdown-item">Профиль</div>
                        <div class="dropdown-item" @click="logout()">Выйти</div>

                    </div>
                </div>

            </div>
        </div>
    </div>
    <!--
        <div class="container auth-header">
        <div class="row justify-content-end">
            <div class="col-2 user-window">
                <label for="username">login:</label>
                <p name="username" v-if="loggedIn">{{ userName }}</p>
                <div v-if="!loggedIn" class="btn btn-success" @click="loginMode()">Войти</div>
                <div v-if="loggedIn" class="btn btn-logout" @click="logout()">Выйти</div>
            </div>
        </div>
    </div>
-->
    <AuthPopUpVue v-if="isAuthMode" @loginMode="loginMode()"></AuthPopUpVue>
</template>

<script>
import store from '../store'
import AuthPopUpVue from './AuthPopUp.vue'

export default {
    data() {
        return {
            isAuthMode: false,
            loggedIn: false,
            userName: "",
        }
    },
    methods: {

        loginMode() {
            this.isAuthMode = !this.isAuthMode

            const token = localStorage.getItem("token")
            if (token) {
                this.loggedIn = true
                store.dispatch("setTokenAction", token)
                this.userName = store.getters.getUserLogin
                this.$emit("login")
            }
        },
        logout() {
            localStorage.removeItem("token")
            this.loggedIn = false
            store.dispatch("setLogin", false)
            this.$emit("logout")
        },

    },
    mounted() {
        const token = localStorage.getItem("token")
        if (token) {
            this.loggedIn = true
            store.dispatch("setTokenAction", token)
            this.userName = store.getters.getUserLogin
        }
    },
    components: {
        AuthPopUpVue
    }
}
</script>

<style>
.auth-header {
    margin-top: 60px;
    display: flex;
    justify-content: start;
}

.label {
    color: #000;
}

.profile {
    margin-left: auto;
    display: inline-block;
}

/* всплывающее меню */


.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    border: 1px solid #1bbc9b;
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(152, 147, 147, 0.2);
    z-index: 1;
}

.dropdown-item {
    padding: 10px;
}

.dropdown-item:hover {
    background-color: #4ed8bc;
    cursor: pointer;
}


.dropdown:hover .dropdown-content {
    display: block;
}
.dropdown:hover svg{
    transform: rotate(-90deg);
}

.dropdown-btn {
    color: #1bbc9b;
    border: 2px solid #1bbc9b;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
}

.dropdown-btn:hover {
    cursor: pointer;
}

/* кнопка */
.wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.btn-login {
    border-radius: 5px;
    padding: 0 15px;
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-family: sans-serif;
    text-decoration: none;
    color: #1bbc9b;
    border: 2px solid #1bbc9b;
    letter-spacing: 2px;
    text-align: center;
    position: relative;
    transition: all .15s;
}

.btn-login span {
    position: relative;
    z-index: 2;
}

.btn-login:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #1bbc9b;
    transition: all .15s;
}

.btn-login:hover {
    cursor: pointer;
}

.btn-login:hover span {
    color: white;
}

.btn-login:hover:after {
    width: 100%;
}
</style>