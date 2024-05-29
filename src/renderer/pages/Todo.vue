<template>
    <div class="todo">
        <div class="todo-header">
            <input class="todo-input" type="text" placeholder="add new task" v-model="newTodo">
            <button class="todo-add" @click="addTodo">Add</button>
        </div>
        <ToDoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ToDoItem from '../components/ToDoItem.vue'
import eventBus from '../../common/event-bus'



const newTodo = ref('')

const todos = ref([
    {
        id: 1,
        title: 'Todo 1',
        completed: false
    },
    {
        id: 2,
        title: 'Todo 2',
        completed: false
    },
    {
        id: 3,
        title: 'Todo 3',
        completed: false
    }
])


function addTodo() {
    todos.value.push({
        id: Date.now(),
        title: newTodo.value,
        completed: false
    })
    newTodo.value = ''
}

eventBus.on('editTodo', (id: any) => {
    console.log('rec', id);
})

</script>




<style>
.todo-header {
    height: 60px;
    background: #008ee0;
    display: flex;
    padding: 8px;
    box-sizing: border-box;
}
</style>