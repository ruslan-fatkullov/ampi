<template>
    <div class="wrapper">
        <Doughnut :data="data" :options="options"/>
    </div>
</template>

<script>

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'vue-chartjs'
import {options} from "./ChartConfig";
import store from "@/store";

ChartJS.register(ArcElement, Tooltip, Legend)
export default {
    computed: {
        options() {
            return options
        },
        data() {
            return store.getters.getCharset
        }
    },
    data() {
        return {
            downloadSum: [],
            labelSum: [],

        }


    },
    components: {
        Doughnut
    },
    props: {
        files: Array
    },
    methods: {
        update() {
            this.files.forEach(item => {
                this.downloadSum.push(item.conuntOfDownload);
                this.labelSum.push(item.name);
            })
            store.commit("setChartData", this.downloadSum, this.labelSum)
        }

    },

    beforeUpdate() {
        this.files.forEach(item => {
            this.downloadSum.push(item.conuntOfDownload);
            this.labelSum.push(item.name);
        })
        store.commit("setChartData", this.downloadSum, this.labelSum)
    },

}
</script>

<style scoped>
</style>