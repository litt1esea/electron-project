<template>
    <Alarm></Alarm>
    <button @click="exit">退出</button>
</template>









<script setup lang="ts">
import Alarm from './pages/Alarm.vue';

function exit() {
    window.electronApi.exit()
}
</script>