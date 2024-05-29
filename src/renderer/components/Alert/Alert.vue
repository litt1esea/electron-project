<template>
    <div class="alert-mask" v-if="config">
        <div class="alert-header">
            Alert
        </div>

        <div class="alert-body">{{ config.info }}</div>
        <div class="alert-footer">
            <button @click="cancelBtnClick">cancel</button>
            <button @click="okBtnClick">ok</button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import eventBus from '../../../common/event-bus'

const config = ref(null)
const alertFn = (params) => {
    config.value = params
}
onMounted(() => {
    eventBus.on('alert', alertFn)
})

onUnmounted(() => {
    eventBus.off('alert', alertFn)
})

const okBtnClick = (btnName) => {
    eventBus.emit(config.value.__alertPromiseId, true)
    config.value = null
}

const cancelBtnClick = (btnName) => {
    eventBus.emit(config.value.__alertPromiseId, false)
    config.value = null
}



</script>


<style scoped>

.alert-mask {
    position: absolute;
    width: 200px;
    height: 200px;;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
}
</style>