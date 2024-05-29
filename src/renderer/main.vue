<template>
    <Todo></Todo>
    <button @click="exit" style="margin-top: 16px">退出</button>
</template>









<script setup lang="ts">
import Todo from './pages/Todo.vue'

function exit() {
    window.electronApi.exit()
}
</script>