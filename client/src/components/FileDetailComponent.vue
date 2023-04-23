<template>
    <div @click="$emit('closeDetail')" class="wrapper">
        <div @click.stop="" class="container content">
            <div class="row">
                <div class="col-md-3">
                    <div>
                        <div class="image">
                            <img src="../assets/lo.png">
                        </div>
                        <div class="label">
                            <span>Файл</span>
                            {{ file.name}}
                        </div>
                        <div class="label">
                            <span>Скачано: </span>
                            {{ reports.length }}
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <h1>История скачиваний</h1>
                    <div class="scroll-body" v-if="file">

                        <div v-for="(note, index) in reports" :key="note.id">
                            <div class="row-data">
                                <div class="data-column number">{{ index+1 }}</div>
                                <div class="data-column">{{note.userDownload}}</div>
                                <div class="data-column">{{note.date}}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import index from "vuex";

export default {
    computed: {
        index() {
            return index
        }
    },
    data(){
        return{

        }
    },
    props:{
        file: Object,
        reports: Array
    },
    methods: {}
}
</script>

<style scoped>
.wrapper {
    position: fixed;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}

.content {
    padding: 30px;
    width: 100%;
    height: 80%;
    opacity: 2;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
}


.data-column {
    position: relative;
    text-align: left;
    width: 30%;
    margin: auto 0 auto 10px;
}
.number{
    width: 8%;
}


.row-data {
    height: 60px;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #1bc5b3;
}

.scroll-body{
    height: 50%; /* высота нашего блока */
    background: #fff; /* цвет фона, белый */
    overflow-y: scroll; /* прокрутка по вертикали */
    padding: 5px;
    border: 1px solid #1bc5b3;
}
.image img{
    width: auto;
}
</style>