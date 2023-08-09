<script setup>
import TodoCreator from '../components/TodoCreator.vue';
import TodoItem from '../components/TodoItem.vue';
import {uid} from 'uid';
import {ref, watch, computed} from "vue";
import {Icon} from '@iconify/vue'

const todoList = ref([])

watch(todoList, () => {
  setTodoListLocalStorage() 
}, {
  deep:true
})

const todoCompleted = computed(()=>{
  return todoList.value.every((item)=>item.isCompleted)
})

const fetchTodoList = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("todolist"))
  if(savedTodoList){
    todoList.value = savedTodoList
  }
};

fetchTodoList();

const setTodoListLocalStorage = () => {
  localStorage.setItem("todolist", JSON.stringify(todoList.value))
};

const createTodo = (todo) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: null,
    isEditing: null,
  })
};

const toggleComplete = (position) => {
  todoList.value[position].isCompleted = !todoList.value[position].isCompleted
};
const editTodo = (position) => {
  todoList.value[position].isEditing = !todoList.value[position].isEditing
};
const updateTodo = (value, position) => {
  todoList.value[position].todo = value
};
const deleteTodo = (id) => {
  todoList.value = todoList.value.filter(item => item.id != id)
};  

</script>

<template>
  <main>
    <h1>Create todo</h1>
    <TodoCreator @create-todo="createTodo"/>
    <ul class="todo-list" v-if="todoList.length>0">
      <TodoItem 
        v-for="(todo, index) in todoList"
        :todo="todo"
        :index="index"
        @toggle-complete="toggleComplete"
        @edit-todo="editTodo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
        />
    </ul>
    <p class="todos-msg" v-else>
      <Icon icon="noto-v1:sad-but-relieved-face" width="22"/>
      <span>You have no todo's to complete! Add one!</span>
    </p>
    <p v-if="todoCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="noto-v1:party-popper"/>
      <span>You have completed all your todos</span>
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
