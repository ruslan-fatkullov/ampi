<template>
  <router-view></router-view>
  <div class="container">
    <div class="row justify-content-end">
      <div class="col-md-3 ">
        <p v-if="loggedIn">{{ userName }}</p>
        <div v-if="!loggedIn" class="btn btn-success" @click="loginMode()">Войти</div>
        <div v-if="loggedIn" class="btn btn-danger" @click="logout()">Выйти</div>
        <div>{{ token }}</div>
      </div>
    </div>
  </div>

  <div v-if="loggedIn" class="container">
    <div class="row">
      <div class="col-3">
        <form accept-charset="UTF-8" @submit.prevent="sendFile()" enctype="multipart/form-data; charset=utf-8">
          <label>Файл</label><br>
          <input type="file" name="file" ref="file" v-on:change="handleFileUpload()" /><br><br>
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>

  </div>


  <h1>Файлы</h1>
  <div class="container">
    <div class="table">
      <div class="head">
        <div class="row table-row">
          <div class="col table-header">Название</div>
          <div class="col table-header">Автор</div>
          <div class="col table-header">Кол-во скачиваний</div>
          <div class="col table-header"></div>
        </div>
      </div>
      <div class="table-body">
        <div class="row table-row" v-for="file in files" :key="file.id">
          <div class="col table-data">
            <p>{{ file.name }}</p>
          </div>
          <div class="col table-data">
            <p>{{ file.author }}</p>
          </div>
          <div class="col table-data">
            <p>{{ file.conuntOfDownload }}</p>
          </div>
          <div class="col table-data">
            <!--<p>{{ file.linkToFile }}</p>-->
            <div @click="download(file.name)" class="btn btn-success">Скачать</div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <AuthPopUpVue v-if="isAuthMode" @loginMode="loginMode()"></AuthPopUpVue>
</template>

<script>
import axios from 'axios'
import config from '../config/config'
import AuthPopUpVue from './AuthPopUp.vue'
import store from '../store';


export default {
  data() {
    return {
      file: '',
      files: [],
      isAuthMode: false,
      token: "",
      loggedIn: false,

      userName: ""
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    //скачивание файла
    async download(fileName) {

      const file = {
        name: fileName,
      }
      const response = await fetch(config.SERVICE_1 + "/files/downloadFile", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(file)
      })

      const blob = await response.blob();
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    //отправка файла
    async sendFile() {

      console.log(this.file)
      var data = new FormData()
      data.append('file', this.file)
      data.append('author', store.getters.getUserLogin)


      const res = await axios.post(config.SERVICE_2 + '/files/uploadFile', data, {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8'
        }
      })

      console.log(res)
    },

    logout() {
      localStorage.removeItem("token")
      this.loggedIn = false
    },

    loginMode() {
      this.isAuthMode = !this.isAuthMode

      const token = localStorage.getItem("token")
      if (token) {
        this.loggedIn = true
        store.dispatch("setTokenAction", token)
        this.userName = store.getters.getUserLogin
        console.log(store.getters.getUserLogin)
        console.log(store.getters.getToken)
      }


    },


  },
  mounted() {

    const token = localStorage.getItem("token")
    if (token) {
      this.loggedIn = true
      store.dispatch("setTokenAction", token)
      this.userName = store.getters.getUserLogin
      console.log(store.getters.getUserLogin)
      console.log(store.getters.getToken)
    }

    axios.get(config.SERVICE_1 + "/files/getAllFiles").then((res) => {
      this.files = res.data.files
    }).catch(() => {
      console.log("Не удалось загрузить файлы")
    })
  },

  components: {
    AuthPopUpVue
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 5px solid #fff;
  border-bottom-width: 3px;
  border-collapse: collapse;
  outline: 3px solid #37c748;
  font-size: 15px;
  background: #fff !important;
}

.table div.table-header {

  font-weight: bold;
  padding: 7px 7px 7px 20px;
  background: #37c748;
  border: none;
  text-align: left;
}

.table div.table-body {
  padding: 7px;
  border: none;
  border-top: 3px solid #fff;
  border-bottom: 3px solid #fff;
  text-align: left;
}

.table input[type='text'] {
  outline: none;
  margin-left: 7px;
}

.table p {
  margin: 3px 10px;
}

.table input[type='checkbox']:hover {
  cursor: pointer;
}

.table input[type='checkbox'] {
  margin-left: 25%;
  content: "";
  display: block;
  width: 26px;
  height: 26px;
  border: 20px solid #555555;
  border-radius: 50%;
  background-color: white;
}

.table div.table-body .table-row:nth-child(even) {
  background: #f8f8f8 !important;
}

.table div.table-data {
  padding-left: 10px;
}

.table div.table-data p {
  width: auto;
  overflow-wrap: normal;
  word-wrap: normal;
  word-break: normal;
  line-break: auto;
  hyphens: manual;
}


.table-row-helps {
  margin: 0 5px;
}

.table-row-helps:hover {
  outline: 1px solid RGB(170, 170, 170);
  background-color: RGB(240, 240, 240);
  border-radius: 5px;
  cursor: pointer;
}

.table-data {
  position: relative;
}

.table-data .btn {
  float: right;
}

.input-file {
  position: relative;
  display: inline-block;
}
</style>