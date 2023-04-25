<template>
    <div class="container">

        <AlertWindowVue v-if="showAlert" v-bind:message="resultMessage"></AlertWindowVue>


        <LoaderElementVue v-if="isLoadData" class="loader"></LoaderElementVue>


        <div v-if="!isLoadData" class="table">
            <div class="head">
                <div class="row-header">
                    <div @click="sortByName()" class="data-column-h">Название
                        <span>
                            <svg v-if="nameSorted" xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                                fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                                <path
                                    d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                class="bi bi-sort-alpha-up-alt" viewBox="0 0 16 16">
                                <path
                                    d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                                <path fill-rule="evenodd"
                                    d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
                                <path
                                    d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                            </svg>
                        </span>
                    </div>
                    <div @click="sortByAuthor()" class="data-column-h">Автор
                        <span>
                            <svg v-if="authorSorted" xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                                fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                                <path
                                    d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                class="bi bi-sort-alpha-up-alt" viewBox="0 0 16 16">
                                <path
                                    d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                                <path fill-rule="evenodd"
                                    d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
                                <path
                                    d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                            </svg>
                        </span>
                    </div>
                    <div @click="sortByCount()" class="data-column-h count">Cкачиваний
                        <span>
                            <svg v-if="countSorted" xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                                fill="currentColor" class="bi bi-sort-numeric-down" viewBox="0 0 16 16">
                                <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
                                <path fill-rule="evenodd"
                                    d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                                <path
                                    d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                class="bi bi-sort-numeric-down-alt" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                                <path
                                    d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                            </svg>
                        </span>
                    </div>
                    <div class="data-column-h">Загружен</div>
                    <div class="data-column-h download"></div>
                </div>
            </div>





            <div v-for="file in fileData" :key="file.id">
                <div class="row-data">

                    <div @click="download(file.name)" class="data-column fileNameLabel">
                        <span>{{ file.name }}</span>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    class="bi bi-download" viewBox="0 0 16 16">
                                    <path
                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path
                                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="!isLoadData" class="pagination">
            <div class="pagination-button-group">
                <button @click="prevPage()" :disabled="currentPage === 0" class="prev btn btn-pagination">Назад</button>
                <div class="page-counter">{{ currentPage + 1 }} / {{ countPages }}</div>
                <button @click="nextPage()" :disabled="currentPage > countPages - 2"
                    class="next btn btn-pagination">Вперед</button>
            </div>

        </div>
    </div>
</template>

<script>
import config from "@/config/config";
import store from "@/store";
import AlertWindowVue from "../elements/SlideUpNotification.vue"
import LoaderElementVue from '../elements/LoaderElement.vue';


export default {
    props: {
        search: String
    },

    data() {
        return {
            isLoadData: false,

            allFiles: [],

            resultMessage: "",
            showAlert: false,
            //пагинация

            pageSize: 10,
            currentPage: 0,
            nameSorted: false,
            authorSorted: false,
            countSorted: false,
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

            const blob = await response.blob();
            const downloadURL = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            link.remove()

        },

        nextPage() {
            this.currentPage++;
        },
        prevPage() {
            this.currentPage--;
        },
        sortByName() {
            this.nameSorted = !this.nameSorted
            if (this.nameSorted) {
                this.allFiles = this.allFiles.sort(function (d1, d2) { return (d1.name > d2.name) ? 1 : -1; });
                return
            }
            this.allFiles = this.allFiles.sort(function (d1, d2) { return (d1.name < d2.name) ? 1 : -1; });


        },
        sortByAuthor() {
            this.authorSorted = !this.authorSorted
            if (this.authorSorted) {
                this.allFiles = this.allFiles.sort(function (d1, d2) { return (d1.author > d2.author) ? 1 : -1; });
                return
            }
            this.allFiles = this.allFiles.sort(function (d1, d2) { return (d1.author < d2.author) ? 1 : -1; });
        },
        sortByCount() {
            this.countSorted = !this.countSorted
            if (this.countSorted) {
                this.allFiles = this.allFiles.sort(function (d1, d2) { return (d1.conuntOfDownload > d2.conuntOfDownload) ? 1 : -1; });
                return
            }
            this.allFiles = this.allFiles.sort(function (d1, d2) { return (d1.conuntOfDownload < d2.conuntOfDownload) ? 1 : -1; });
        }

    },
    watch: {
        search() {
            this.currentPage = 0
            if (this.search === "") {
                store.dispatch('getAllFileActon').then(() => {
                    this.allFiles = store.getters.getAllFiles
                })
                return
            }
            store.dispatch('searchOccurence', this.search).then(() => {
                this.allFiles = store.getters.getAllFiles
            })
        }
    },
    computed: {
        countPages() {
            let l = this.allFiles.length,
                s = this.pageSize
            return Math.ceil(l / s)

        },
        fileData() {
            const start = this.currentPage * this.pageSize
            const end = start + this.pageSize
            return this.allFiles.slice(start, end)
        }
    },

    mounted() {
        this.isLoadData = true
        this.currentPage = 0
        store.dispatch('getAllFileActon').then(() => {

            this.isLoadData = false
            this.allFiles = store.getters.getAllFiles

        })
    },

    components: {
        AlertWindowVue,
        LoaderElementVue
    }

}
</script>
<style scoped>
.loader {
    margin: 50px auto;
    display: flex;
}

.data-column,
.data-column-h {
    position: relative;
    text-align: left;
    width: 24%;
    margin: auto 0 auto 10px;

    overflow-wrap: break-word;
}

.data-column-h:hover {
    cursor: pointer;
}

.row-data {
    height: auto;
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

.count {
    text-align: center;
    width: 14%;
}

.number {
    width: 5%;
}

.download {
    width: 14%;
    text-align: center;
}

h1 {
    text-align: left;
    color: #1bc5b3;
}

.table {
    margin-top: 10px;
}

.btn-download:hover {
    transform: scale(1.1);
    color: #4195fc;
}

.fileNameLabel span {
    color: #1bc5b3;
    text-decoration: underline;
}

.fileNameLabel span:hover {
    cursor: pointer;
}

.pagination-button-group {
    margin: auto;
    display: flex;
}

.page-counter {
    margin: 0 20px;
}

.btn-pagination {
    background-color: #1bc5b3;
}
</style>
