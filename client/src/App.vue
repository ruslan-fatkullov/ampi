<template>
  <MainPageVue></MainPageVue>
</template>

<script>
import MainPageVue from './components/MainPage.vue'
require('bootstrap');

export default {
  name: 'App',
  components: {
    MainPageVue,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
