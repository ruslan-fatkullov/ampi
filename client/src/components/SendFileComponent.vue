<template>
    <div class="container">
        <SlideUpNotification v-if="showAlert" v-bind:message="resultString"></SlideUpNotification>

        <div class="upload-wrapper">
            <input v-on:change="handleFileUpload()"  type="file" class="file-input" id="file_input" ref="file">

            <label for="file_input">
                <div class="input-fake">{{ file.name ? file.name : "Выбрать файл..." }}</div>
            </label>

            <button :disabled="!file" @click="sendFile()" class="btn input-button">Отправить</button>
        </div>


    </div>
</template>

<script>
import store from '../store';
import SlideUpNotification from "@/elements/SlideUpNotification.vue";

export default {
    data() {
        return {
            file: '',
            isFile: false,

            showAlert: false,
            resultString: '',
        }
    },
    methods: {

        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            this.isFile = true

        },
        //отправка файла
        async sendFile() {
            if (!this.file.name) {
                return
            }
            const data = new FormData()
            data.append('file', this.file)
            data.append('author', store.getters.getUserLogin)

            store.dispatch('sendFile', data).then(() => {
                this.file = ""
                this.showAlert = true
                this.resultString = store.getters.getFileUploadResult
                setTimeout(() => {
                    this.showAlert = false
                    this.resultString = ""
                }, 2000)
            })
        },
    },
    components: {
        SlideUpNotification
    }
}
</script>

<style scoped>

.upload-wrapper {
    width: 100%;
    display: flex;
    justify-content: end;
}
.input-fake{
    color: #8c8787;
    background-color: #fff;
    border: 1px solid #e4dede;
    width: auto;
    padding: 0 35px;
    height: 50px;
}
.input-fake:hover{
    background-color: #f6f1f1;
    cursor: pointer;
    outline: 1px solid #c1b8b8;
}
.input-button{
    height: 50px;
    width: 100px;
    background-color: #1bbc9b;
    padding: 10px;
    border-radius: 0 7px 7px 0;
    color: #fff;
}

.input-button:hover{
    cursor: pointer;
}



.file-input{
    visibility: hidden;
    position: absolute;
}








.field__wrapper {
    width: 100%;
    position: relative;
    margin: 15px 0;
    text-align: center;
}

.field__file {
    opacity: 0;
    visibility: hidden;
    position: absolute;
}

.field__file-wrapper {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}

.field__file-fake {
    height: 60px;
    width: calc(100% - 260px);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 15px;
    border: 1px solid #c7c7c7;
    border-radius: 3px 0 0 3px;
    border-right: none;
}

.field__file-button {
    width: 130px;
    height: 60px;
    background: #1bbc9b;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 700;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 0 3px 3px 0;
    cursor: pointer;
}
</style>