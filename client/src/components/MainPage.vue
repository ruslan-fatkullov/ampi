<template>
    <div class="main-wrapper">
        <HeaderComponentVue @logout="logout()" @login="loginMode()"></HeaderComponentVue>

        <SendFileComponentVue v-if="loggedIn"></SendFileComponentVue>

        <div class="container">
            <div class="wrapper">
                <div class="tab-panel">
                    <div @click.prevent="setActive('all')" :class="{ active: isActive('all') }" class="tab-item">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-folder2-open" viewBox="0 0 16 16">
                                <path
                                    d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
                            </svg>
                        </span>
                        Файлы
                    </div>
                    <div @click.prevent="setActive('uploaded')" :class="{ active: isActive('uploaded') }" v-if="loggedIn"
                        class="tab-item">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-download" viewBox="0 0 16 16">
                                <path
                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                <path
                                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg>
                        </span>
                        Загруженные
                    </div>


                    <div v-if="isActive('all')" class="search-box">
                        <input v-model="searchText" type="text" placeholder="Поиск.." id="search">
                        <span @click="focusOrClear()">

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>
                    </div>


                </div>
            </div>
        </div>

        <TableAllFilesVue v-bind:search="searchText" v-if="isActive('all')"></TableAllFilesVue>
        <UploadedFilesVue v-if="isActive('uploaded') && loggedIn"></UploadedFilesVue>
    </div>
</template>

<script>
import store from '../store';
import HeaderComponentVue from './HeaderComponent.vue'
import SendFileComponentVue from './SendFileComponent.vue'
import TableAllFilesVue from './TableAllFiles.vue'
import UploadedFilesVue from './UploadedFilesComponent.vue'


export default {
    data() {
        return {
            isAuthMode: false,
            token: "",
            loggedIn: false,
            userName: "",
            activeItem: "all",

            isSearch: false,
            searchText: "",

            //все файлы
            allFiles: []
        }
    },
    methods: {
        setActive(value) {
            this.activeItem = value
            this.searchText = ""
        },
        isActive(value) {
            return this.activeItem === value
        },

        logout() {
            localStorage.removeItem("token")
            this.loggedIn = false
            this.activeItem = "all"
        },

        loginMode() {
            this.isAuthMode = !this.isAuthMode

            const token = localStorage.getItem("token")
            if (token) {
                this.loggedIn = true
                store.dispatch("setTokenAction", token)
                this.userName = store.getters.getUserLogin
            }
        },
        focusOrClear() {
            if (this.isSearch) {
                this.searchText = ""
                return
            }
            const search = document.getElementById('search')
            search.focus()

        },
        sortByName(){
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
    watch: {
    },

    components: {
        HeaderComponentVue,
        SendFileComponentVue,
        TableAllFilesVue,
        UploadedFilesVue,
    }
}
</script>

<style scoped>
.main-wrapper {
    margin-bottom: 60px;
}


.tab-panel {
    margin-top: 20px;
    display: flex;
    justify-content: start;
    width: auto;
}


.tab-item {
    border-radius: 8px 8px 0 0;
    border: 1px solid;
    max-width: 250px;
    width: 100%;
    text-align: center;
    margin-left: 5px;
    padding: 15px 42px;
    background-color: #ffffff;
    color: #1bbc9b;
    font-family: 'Century Gothic', serif;
    font-weight: bold;
    font-size: 16px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.tab-item:hover {
    cursor: pointer;
    outline: 1px solid;
}

.tab-item:active {
    transform: translateY(-5px);
    background-color: #1bc5b3;
    color: #f3f3f3;
}


.active {
    transform: translateY(-5px);
    border-radius: 8px 8px 0 0;
    border: 1px solid;
    max-width: 250px;
    width: 100%;
    text-align: center;
    margin-left: 5px;
    padding: 15px 42px;
    background-color: #1bc5b3;
    color: #f3f3f3;
    font-family: 'Century Gothic', serif;
    font-weight: bold;
    font-size: 16px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.search-box {
    margin-left: auto;
    max-width: 250px;
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 1px solid #777272;

}

.search-box input[type="text"] {
    width: 80%;
    border: none;
    outline: none;

}

.search-box span {
    position: relative;
    width: 20%;
}

.search-box span svg {
    position: absolute;
    width: 100%;
    bottom: 35%;
}

.search-box span svg:hover {
    cursor: pointer;
}
</style>