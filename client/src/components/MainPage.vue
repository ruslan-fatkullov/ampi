<template>
  <h1>Файлы</h1>
  <div v-for="file in files" :key="file.id">
    <div>{{file.name}}   {{ file.author }}   {{ file.conuntOfDownload }}   {{ file.linkToFile }}</div><br/>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config/config'

export default {
  data() {
    return{
      files: []
    }
  },
  mounted() {
    axios.get(config.SERVICE_1 + "/files/getAllFiles").then((res) => {
      this.files = res.data.files
    }).catch(()=>{
      console.log("Не удалось загрузить файлы")
    })
  }
}
</script>

<style></style>