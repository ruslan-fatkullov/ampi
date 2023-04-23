<template>

    <div class="container">

        <AlertWindowVue v-if="showAlert" v-bind:message="resultMessage"></AlertWindowVue>
        <div class="table">
            <div class="head">
                <div class="row-header">
                    <div class="data-column-h">Название
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16"><path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/></svg>
                        </span>
                    </div>
                    <div class="data-column-h">Автор</div>
                    <div class="data-column-h count">Cкачиваний</div>
                    <div class="data-column-h">Загружен</div>
                    <div class="data-column-h download"></div>
                </div>
            </div>
            <div v-for="file in files" :key="file.id">
                <div class="row-data">

                    <div class="data-column">
                        {{ file.name }}
                    </div>
                    <div class="data-column">
                        {{ file.author }}
                    </div>
                    <div class="data-column count">
                        {{ file.conuntOfDownload }}
                    </div>
                    <div class="data-column">
                        {{ file.createdAt }}
                    </div>
                    <div class="data-column download">
                        <div @click="download(file.name)" class="btn btn-download">
                            <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import config from "@/config/config";
import axios from "axios";
import store from "@/store";
import AlertWindowVue from "../elements/SlideUpNotification.vue"

export default {

    data() {
        return {
            file: '',
            files: [],
            resultMessage: "",
            showAlert: false
        }
    },
    methods: {
        //скачивание файла
        async download(fileName) {

            const login = store.getters.getUserLogin ? store.getters.getUserLogin : null
            const file = {
                name: fileName,
                userDownload: login
            }
            const response = await fetch(config.SERVICE_1 + "/files/downloadFile", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(file)
            })
            if (response.status !== 200) {
                if (response.status === 400) {
                    this.resultMessage = "Не удалось загрузить файл";
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false
                        this.resultMessage = "";
                    }, 2000)
                }
                return
            }
            console.log(response)
            const blob = await response.blob();
            const downloadURL = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            link.remove()

        },

    },
    mounted() {
        axios.get(config.SERVICE_1 + "/files/getAllFiles").then((res) => {
            this.files = res.data.files
        }).catch(() => {
            console.log("Не удалось загрузить файлы")
        })
    },

    components: {
        AlertWindowVue
    }

}
</script>
<style scoped>

.data-column , .data-column-h{
    position: relative;
    text-align: left;
    width: 24%;
    margin: auto 0 auto 10px;
}

.data-column-h:hover {
    cursor: pointer;
}

.row-data {
    height: 60px;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #1bc5b3;
}
.row-header {
    padding: 10px;
    color: #f3f3f3;
    font-weight: bold;
    background-color: #1bc5b3;
    width: 100%;
    display: flex;
}

.count{
    text-align: center;
    width: 14%;
}
.download{
    width: 14%;
    text-align: center;
}
h1 {
    text-align: left;
    color: #1bc5b3;
}
.table{
    margin-top: 10px;
}
.btn-download:hover{
    transform: scale(1.1);
    color: #4195fc;
}



</style>
