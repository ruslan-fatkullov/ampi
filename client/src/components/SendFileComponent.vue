<template>
    <div class="container">
        <SlideUpNotification v-if="showAlert" v-bind:message="resultString"></SlideUpNotification>

        <div class="field__wrapper">

            <input v-on:change="handleFileUpload()" ref="file" name="file" type="file" id="field__file-2"
                class="field field__file">

            <label class="field__file-wrapper" for="field__file-2">
                <div class="field__file-fake">{{ file.name ? file.name : "Файл не выбран" }}</div>
                <div class="field__file-button">Выбрать</div>
            </label>
           <div @click="sendFile()" class="field__file-button">Отправить</div>

        </div>

    </div>
</template>

<script>
import axios from 'axios';
import store from '../store';
import config from '../config/config';
import SlideUpNotification from "@/elements/SlideUpNotification.vue";

export default {
    data() {
        return {
            file: "",
            showAlert: false,
            resultString: "",
        }
    },
    methods: {

        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        //отправка файла
        async sendFile() {
            if (!this.file.name) {
                return
            }
            const data = new FormData()
            data.append('file', this.file)
            data.append('author', store.getters.getUserLogin)

            await axios.post(config.SERVICE_2 + '/files/uploadFile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=utf-8'
                }
            }).then((res) => {
                this.file = ""
                this.resultString = res.data.message
                this.showAlert = true
                setTimeout(()=>{
                    this.showAlert = false
                    this.resultString = ""
                },2000)
                //console.log(res.data.message)
            })
        },
    },
    components:{
        SlideUpNotification
    }
}
</script>

<style scoped>
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
    width: calc(100% - 130px);
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