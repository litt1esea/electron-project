<template>
    <Todo></Todo>
    <button @click="exit" style="margin-top: 16px">退出</button>
</template>





<script setup lang="ts">
import { alert } from './components/Alert';
import Todo from './pages/Todo.vue'

async function exit() {
    const ok = await alert({
        info:'确定要退出吗?'
    })
    if (ok) {
        window.electronApi.exit()
    }
}
</script>