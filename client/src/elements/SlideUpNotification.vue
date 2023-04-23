<template>
    <div class="alert_window">
        {{ message }}
    </div>
</template>

<script>
export default {
    props:{
        message: String
    }
}
</script>

<style scoped>
.alert_window {
    display: block;
    position: fixed;
    padding: 10px;
    left: calc(50% - 150px);
    top: 10%;
    border-radius: 20px;
    color: #000;
    background-color: rgb(0, 255, 240);
    animation: slideUp 2s ease infinite;
}
@keyframes slideUp {
    0% {
        opacity: 0;
        transform: translateY(0);
    }

    50% {
        opacity: 1;
        transform: translateY(10px);
    }

    100% {
        opacity: 0;
        transform: translateY(0);
    }
}
</style>