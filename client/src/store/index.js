import Vuex from "vuex"
import authModule from './authModule'
import chartModule from "@/store/chartModule";
import fileModule from "@/store/fileModule";

export default new Vuex.Store({
    modules:{
        authModule,
        chartModule,
        fileModule
    },

})