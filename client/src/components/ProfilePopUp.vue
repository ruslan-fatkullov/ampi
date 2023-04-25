<template>
    <div @click="$emit('closeProfile')" class="profile-wrapper">
        <div @click.stop="" class="container profile-content">
            <div class="edit-goup">
                <div v-if="editMode">
                    <label for="editinput">Логин: </label>
                    <input name="editinput" type="text" v-model="newLogin">
                </div>
                <p v-else>Логин: {{ newLogin }}</p>
            </div>
            <div class="edit-btn-group">
                <div>
                    <div v-if="editMode" class="btn-edit confirm" @click="changeName()">Подтвердить</div>
                    <div v-else class="btn-edit edit" @click="changeMode()">Редактировать</div>
                    
                </div>
                <div class="btn-edit close" @click="$emit('closeProfile')">Закрыть</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store'
import config from '../config/config'
export default {
    data() {
        return {
            editMode: false,
            newLogin:""
        }
    },
    methods: {
        changeMode() {
            this.editMode = !this.editMode
        },
        changeName(){
            const newUser ={
                newLogin: this.newLogin,
                token: store.getters.getToken
            }
            axios.post(config.SERVICE_3+"/auth/changeName", newUser).then((res)=>{
                console.log(res.data.token)
                store.dispatch('setTokenAction', res.data.token)
                localStorage.setItem("token", res.data.token)
                this.$emit('changeUserName')
                this.editMode = false 
            })
        }
    },
    mounted(){
        this.newLogin = store.getters.getUserLogin
    }
}
</script>

<style scoped>
.profile-wrapper {
    position: fixed;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}

.profile-content {
    padding: 80px;
    width: auto;
    height: auto;

    opacity: 2;
    border-radius: 10px;
    z-index: 100;
    background-color: rgba(255, 255, 255, 1);
}

.edit-btn-group {
    display: flex;
    margin-top: 20px;
}

.btn-edit {
    margin-left: 5px;
    padding: 10px;
    border-radius: 5px;
    color: rgb(73, 75, 77);
}

.btn-edit:hover {
    cursor: pointer;
}

.edit {
    background-color: rgb(220, 225, 68);
}
.confirm {
    background-color: rgb(113, 161, 113);
}
.close {
    background-color: rgb(178, 183, 178);
}

.edit-goup {
    font-size: 32px;
}

.edit-goup input {
    margin-left: 20px;
    width: 200px;
}
</style>