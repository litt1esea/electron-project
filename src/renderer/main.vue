<template>
    <div>Hello</div>




    <button @click="exit">退出</button>
</template>









<script setup>


function exit() {
    window.electronApi.exit()
}
</script>