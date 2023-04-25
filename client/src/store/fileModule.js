import axios from "axios"
import config from "@/config/config"
export default {
    state: {
        // загрузка файлов
        //все файлы
        allFiles: [],
        //результат загрузки
        resultGetAllFiles: "",

        authorFiles: [],

        fileUploadResult: "",
    },
    actions: {
        async sendFile(context, data) {

            await axios.post(config.SERVICE_2 + '/files/uploadFile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=utf-8'
                }
            }).then((res) => {
                context.commit('setFileUploadResult', res.data.message)
            })

        },
        async getAllFileActon(context) {
            await axios.get(config.SERVICE_4 + "/report/getAllFiles").then((res) => {
                context.commit('setAllFiles', res)
            }).catch(() => {
                context.commit('setResultGetAllFiles', "Не удалось загрузить файлы")
                console.log("Не удалось загрузить файлы")
            })
        },

        async searchOccurence(context, search) {
            const searchData = {
                search: search
            }
            await axios.post(config.SERVICE_4 + "/report/getFilesBySearch", searchData).then((res) => {
                context.commit('setAllFiles', res)
            }).catch(() => {
                console.log("Не удалось найти файлы")
            })
        },

        async getFileByAuthor(context, body) {
            await axios.post(config.SERVICE_4 + "/report/getFilesByAuthor", body).then((res) => {
                context.commit("setAuthorFiles", res)
            })
        },

        async deleteFile(context, fileToDelete) {
            const data = { filename: fileToDelete.name }
            await axios.post(config.SERVICE_2 + "/files/deleteFile", data).then((res) => {
                if (res.data.status === 200) {
                    context.commit('deleteFile', fileToDelete)
                }
            })
        },

      
    },
    mutations: {
        setAllFiles(state, res) {
            state.allFiles = res.data.files
        },
        setResultGetAllFiles(state, mes) {
            state.resultGetAllFiles = mes
        },
        setAuthorFiles(state, res) {
            state.authorFiles = res.data.reports
        },
        deleteFile(state, file) {
            state.authorFiles = state.authorFiles.filter(item =>
                item.name !== file.name
            )
        },
        setFileUploadResult(state, mes){
            state.fileUploadResult = mes
        }
    },
    getters: {
        getAllFiles: state => {
            return state.allFiles
        },
        getResultGetAllFiles: state => {
            return state.resultGetAllFiles
        },
        getAuthorFiles: state => {
            return state.authorFiles
        },
        getFileUploadResult: state => {
            return state.fileUploadResult
        }
    }
}