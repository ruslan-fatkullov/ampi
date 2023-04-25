<template>
    <div class="container">
        <div class="auth-header">

            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="profile">
                <div v-if="!loggedIn" class="btn-login" @click="loginMode()"><span>Войти</span></div>

                <div v-if="loggedIn" class="dropdown">
                    <div class="dropdown-btn">{{ userName }}
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="dropdown-i bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </span>
                    </div>
                    <div class="dropdown-content">
                        <div class="dropdown-item" @click="showProf()">Профиль</div>
                        <div class="dropdown-item" @click="logout()">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                    <path fill-rule="evenodd"
                                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg>
                            </span>
                            Выйти
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
    <AuthPopUpVue v-if="isAuthMode" @loginMode="loginMode()"></AuthPopUpVue>
    <ProfilePopUp v-if="showProfile" @closeProfile="closeProfile()" @changeUserName="updateUserName()"></ProfilePopUp>
</template>

<script>
import store from '../store'
import AuthPopUpVue from './AuthPopUp.vue'
import ProfilePopUp from './ProfilePopUp.vue'

export default {
    data() {
        return {
            isAuthMode: false,
            loggedIn: false,
            userName: store.getters.getUserLogin,

            showProfile: false,
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
            store.dispatch("setLoginAction", false)
            this.$emit("logout")
        },
        showProf(){
            this.showProfile = true
        },
        closeProfile(){
            this.showProfile = false
        },
        updateUserName(){
            this.userName = store.getters.getUserLogin
        }

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
        AuthPopUpVue,
        ProfilePopUp
    }
}
</script>

<style scoped>
.auth-header {
    margin-top: 60px;
    display: flex;
    justify-content: start;
}

.logo img {
    width: 150px;
}

.label {
    color: #1bbc9b;
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
    transition-duration: 250ms;
    display: block;
}

.dropdown:hover svg.dropdown-i {
    transition-duration: 250ms;
    transform: rotate(-90deg);
}

.dropdown-btn {
    color: #1bbc9b;
    border: 1px solid #1bbc9b;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
}

.dropdown-btn:hover {
    cursor: pointer;
}

/* кнопка */
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
    border: 1px solid #1bbc9b;
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