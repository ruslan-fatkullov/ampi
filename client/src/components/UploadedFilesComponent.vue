<template>
    <div class="container wrapper-upload">
        <div class="row">
            <div class="col-sm-12 col-md-8">

                <div class="row-header">
                    <div class="data-column">Файл</div>
                    <div class="data-column count">Cкачиваний</div>
                    <div class="data-column">Добавлен</div>
                    <div class="data-column delete"></div>
                </div>

                <div v-for="report in reports" :key="report.id">


                    <div @click="showDetail(report)" class="row-data">
                        <div class="data-column">{{ report.name }}</div>
                        <div class="data-column count">{{ report.conuntOfDownload }}</div>
                        <div class="data-column">{{ report.createdAt }}</div>
                        <div class="data-column delete">
                            <div class="delete-button">
                                <span>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                           class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                      </svg>
                                </span>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
            <div class="col-md-4 graph">
                <ChartFileComponent v-bind:files="reports"></ChartFileComponent>
            </div>
        </div>
    </div>
    <FileDetail v-bind:reports="reportsDetail" v-bind:file="fileDetail" @closeDetail="closeDetail()" v-if="detailActive"></FileDetail>
</template>

<script>
import axios from "axios";
import config from "../config/config";
import store from "@/store";

import ChartFileComponent from "@/components/ChatJSDoughunt/ChartFileComponent.vue";
import FileDetail from "@/components/FileDetailComponent.vue"


export default {
    data() {
        return {
            reports: [],
            detailActive: false,

            fileDetail: {},
            reportsDetail: []
        }
    },
    mounted() {
        const body = {
            author: store.getters.getUserLogin,
        }
        axios.post(config.SERVICE_4 + "/report/getFilesByAuthor", body).then((res) => {
            this.reports = res.data.reports
        })

    },
    methods: {
        closeDetail() {
            this.detailActive = false
        },
        showDetail(file) {
            axios.post(config.SERVICE_4 + "/report/getReportByFile", {
                name: file.name
            }).then((res) => {
                console.log(res.data.reports)
                this.fileDetail = file
                this.reportsDetail = res.data.reports
                this.detailActive = true
            })

        },

    },
    components: {
        ChartFileComponent,
        FileDetail
    }
}
</script>

<style scoped>
.row-header {
    padding: 10px;
    color: #f3f3f3;
    font-weight: bold;
    background-color: #1bc5b3;
    width: 100%;
    display: flex;
}

.data-column {
    position: relative;
    text-align: left;
    width: 35%;
    margin: auto 0 auto 10px;
}


.count {
    width: 20%;
    text-align: center;
}

.delete {
    width: 10%;
}

.row-data {
    height: 60px;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #1bc5b3;
}

.row-data:hover {
    cursor: pointer;
    transform: scale(1.01);
    background-color: #faf8f8;
}

.delete-button {
    width: 100%;
    height: 50%;
    top: 25%;
    text-align: center;
    position: relative;
}

.delete-button span {
    color: red;
}

.delete-button:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.wrapper-upload {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>