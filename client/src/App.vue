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
::-webkit-scrollbar {
    width: 0;
}
</style>
