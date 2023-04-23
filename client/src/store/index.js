import Vuex from "vuex"
import authModule from './authModule'
import chartModule from "@/store/chartModule";

export default new Vuex.Store({
    modules:{
        authModule,
        chartModule
    },

})